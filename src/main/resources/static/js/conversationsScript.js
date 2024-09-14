document.addEventListener('DOMContentLoaded', () => {

    const sendBtn = document.getElementById('sendBtn');
    const messageText = document.getElementById('messageText');
    const messagesContainer = document.querySelector('.messages');
    const conversationsContainer = document.querySelector('.conversations');
    const messagesHeader = document.querySelector('.messages-header');
    let phoneNumber = localStorage.getItem('phoneNumber');
    let token = localStorage.getItem('token');
    let activeConversation = null;

    const API_BASE_URL = 'http://localhost:8080';
    const DEFAULT_PROFILE_PHOTO = 'https://th.bing.com/th/id/OIP.sZRBs2Cab1BGQzZzom61RgHaHa?w=193&h=194&c=7&r=0&o=5&pid=1.7';

    // Function to send a message
    const sendMessage = () => {
        const messageContent = messageText.value.trim();
        if (!messageContent || !activeConversation) return;

        const messageElement = createMessageElement(messageContent, 'sent');
        messagesContainer.appendChild(messageElement);

        fetch(`${API_BASE_URL}/Conversation/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userPhone: phoneNumber,
                ConversationId: activeConversation.id,
                content: messageContent,
                status: 'sent',
                attachmentUrl: null,
                attachmentType: null
            })
        }).catch(error => console.error('Error sending message:', error));

        messageText.value = '';
        scrollToBottom(messagesContainer);
    };

    // Fetch conversations for a specific user
    const fetchConversations = () => {
        fetch(`${API_BASE_URL}/Conversation/getConversationsForUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
                'Authorization': `Bearer ${token}`
            },
            body: phoneNumber
        })
        .then(response => response.json())
        .then(renderConversations)
        .catch(error => console.error('Error fetching conversations:', error));
    };

    // Render conversations dynamically
    const renderConversations = (conversations) => {
        conversationsContainer.innerHTML = ''; // Clear previous content
        conversations.forEach(conversation => {
            const conversationItem = createConversationItem(conversation);
            conversationItem.addEventListener('click', () => onConversationClick(conversation));
            conversationsContainer.appendChild(conversationItem);
        });
    };

    // Handle conversation click
    const onConversationClick = (conversation) => {
        activeConversation = conversation;
        updateMessagesHeader(conversation);
        fetchMessages(conversation.id);
    };

    // Fetch messages for a specific conversation
    const fetchMessages = (conversationId) => {
        fetch(`${API_BASE_URL}/Conversation/getConversationMessages/${conversationId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(renderMessages)
        .catch(error => console.error('Error fetching messages:', error));
    };

    // Render messages dynamically
    const renderMessages = (messages) => {
        messagesContainer.innerHTML = ''; // Clear previous messages
        messages.forEach(message => {
            const messageElement = createMessageElement(
                message.content,
                message.userPhoneNumber === phoneNumber ? 'sent' : 'received'
            );
            messagesContainer.appendChild(messageElement);
        });
        scrollToBottom(messagesContainer);
    };

    // Utility functions

    // Create a conversation item
    const createConversationItem = (conversation) => {
        const conversationItem = document.createElement('div');
        conversationItem.classList.add('conversation-item');

        const isDirectChat = conversation.type === 'DirectChat';
        const profilePhoto = isDirectChat ? conversation.OtherUser.photoUrl : conversation.photoUrl;
        const profileImageUrl = profilePhoto || DEFAULT_PROFILE_PHOTO;

        conversationItem.innerHTML = `
            <img src="${profileImageUrl}" alt="Profile" class="conversation-profile">
            <div class="conversation-details">
                <span class="conversation-name">${isDirectChat ? conversation.OtherUser.name : conversation.name}</span>
                <span class="conversation-snippet">${conversation.lastMessage}</span>
            </div>
            <div class="conversation-meta">
                <span class="conversation-time">${conversation.createAt}</span>
                <span class="unread-count">${conversation.unreadCount}</span>
            </div>
        `;

        return conversationItem;
    };

    // Create a message element
    const createMessageElement = (content, type) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerText = content;
        return messageElement;
    };

    // Update messages header
    const updateMessagesHeader = (conversation) => {
        const isDirectChat = conversation.type === 'DirectChat';
        const profilePhoto = isDirectChat ? conversation.OtherUser.photoUrl : conversation.photoUrl;
        const profileImageUrl = profilePhoto || DEFAULT_PROFILE_PHOTO;

        messagesHeader.innerHTML = `
            <img src="${profileImageUrl}" alt="Profile" class="messages-profile">
            <span class="messages-contact-name">${isDirectChat ? conversation.OtherUser.name : conversation.name}</span>
        `;
    };

    // Scroll to the bottom of the messages container
    const scrollToBottom = (container) => {
        container.scrollTop = container.scrollHeight;
    };

    // Initial fetch for conversations
    fetchConversations();

    // Event listener for sending messages
    sendBtn.addEventListener('click', sendMessage);
});
