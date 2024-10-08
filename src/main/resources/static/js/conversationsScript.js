document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const messageText = document.getElementById('messageText');
    const messagesContainer = document.querySelector('.messages');
    const conversationsContainer = document.querySelector('.conversations');
    const messagesHeader = document.querySelector('.messages-header');
    const messageInputBox = document.querySelector('.message-input');
    const newConversationBtn = document.getElementById('newDirectChat');
    const newGroupChatBtn = document.getElementById('newGroupChat');
    const messageContent = document.getElementById('messageContent');
    const newDirectChatModal = document.getElementById("newDirectChatModal");
    const newGroupModal = document.getElementById("newGroupChatModal");
    const messageModal =document.getElementById("messageModal");
    const span = document.getElementById("close");
    const span2 = document.getElementById("close2");
    const span3 = document.getElementById("close3");
    let phoneNumber = localStorage.getItem('phoneNumber');
    let token = localStorage.getItem('token');
    let activeConversation = null;
    let dropdown = null;
    let optionsIcon=null;

    const API_BASE_URL = 'http://localhost:8080';
    const DEFAULT_PROFILE_PHOTO = 'https://th.bing.com/th/id/OIP.sZRBs2Cab1BGQzZzom61RgHaHa?w=193&h=194&c=7&r=0&o=5&pid=1.7';

    newConversationBtn.onclick = () =>newDirectChatModal.style.display = "block";
    newGroupChatBtn.onclick = () =>newGroupModal.style.display = "block";

    span.onclick = () => newDirectChatModal.style.display = "none";
    span2.onclick = () => messageContent.style.display = "none";
    span3.onclick = () => newGroupModal.style.display = "none";

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == newDirectChatModal) {
            newDirectChatModal.style.display = "none";
        }
        if (event.target == messageModal) {
                messageModal.style.display = "none";
            }
        if (event.target == newGroupModal) {
            newGroupModal.style.display = "none";
        }

         if (dropdown && event.target != optionsIcon && !dropdown.contains(event.target)){
            dropdown.style.display = "none";
         }
        }

    // Submit form to create a new conversation
    document.getElementById("new-directChat").addEventListener("submit", (event) => {
        event.preventDefault();
        const newPhoneNumber = document.getElementById("phoneNumber").value;
        if(!newPhoneNumber) {
        newDirectChatModal.style.display = 'none';
        return
        }
        checkPhoneNumber(newPhoneNumber)
            .then(isPhoneUsed => {
                if (isPhoneUsed) {
                    if (newPhoneNumber !== phoneNumber) {
                        createNewConversation(newPhoneNumber);
                    } else {
                        newDirectChatModal.style.display = 'none';
                        showErrorMessage("that is not funny; You can't speak with yourself :-)");
                        return
                    }
                } else {
                    newDirectChatModal.style.display = 'none';
                    showErrorMessage("This phone number does not have an account.");
                    return
                }
            });
            newDirectChatModal.style.display = 'none';
           setTimeout(function (){
            fetchConversations();
           },100);//after this time

    });

    document.getElementById("new-groupChat").addEventListener("submit", (event) => {
            event.preventDefault();
            let groupName=document.getElementById("GroupName").value;
            if(!groupName){
                newGroupModal.style.display = 'none';
                showErrorMessage("please Enter A name ");
                return
            }else{
                fetch("http://localhost:8080/Conversation/addGroupchat",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name:groupName,
                    firstUserPhone:phoneNumber
                })
                }).catch(error => console.error('Error:', error));
            }
            
           newGroupModal.style.display = 'none';
           setTimeout(function (){
            fetchConversations();
           },100);//after this time
            });

    const checkPhoneNumber = (newPhoneNumber) => {
        return fetch(`${API_BASE_URL}/user/isPhoneUsed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
                'Authorization': `Bearer ${token}`
            },
            body: newPhoneNumber
        }).then(response => response.json());
    };

    const createNewConversation = (newPhoneNumber) => {
        fetch(`${API_BASE_URL}/Conversation/addDirectChat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userPhone1: phoneNumber,
                userPhone2: newPhoneNumber
            })
        }).catch(error => console.error('Error:', error));

        newDirectChatModal.style.display = "none";
    };

    const showErrorMessage = (message) => {
        messageModal.style.display = "block";
        messageContent.innerText = message;
    };

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
                status: 'sent'
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
        messageInputBox.classList.remove('hidden');

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
            <img src="https://hypeddit.com/images/option-icon.png" alt="Options" class="options-icon">
            <div class="dropdown">
                <ul>
                    <li id="deleteConversation">Delete this conversation</li>
                    <li id="addMember" class="hidden">Add member</li>
                    <li id="aboutConversation">About this conversation</li>
                </ul>
            </div>
        `;
            optionsIcon = document.querySelector(".options-icon");
            optionsIcon.addEventListener("click",showDropdown);
            setupDropdownActions(isDirectChat);
    };

    const showDropdown = () => {
        dropdown = document.querySelector(".dropdown");
        dropdown.style.display = "block";
    };

    const setupDropdownActions = (isDirectChat) => {
        const addMemberOption = document.getElementById("addMember");
        if (!isDirectChat) addMemberOption.style.display = "block";

        document.getElementById("deleteConversation").addEventListener("click", deleteConversation);
        document.getElementById("addMember").addEventListener("click", addMember);
        document.getElementById("aboutConversation").addEventListener("click", aboutConversation);
    };

    const deleteConversation = () => {
        alert("Delete conversation not Complete yet :-)");
        // Add your action to delete the conversation here
    };

    const addMember = () => {
        alert("Add member not Complete yet :-)");
        // Add your action to add a member here
    };

    const aboutConversation = () => {
        alert("About conversation not Complete yet :-)");
        // Add your action for about conversation here
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


