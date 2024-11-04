package MohammedKhalel.Chat.Controller;

import MohammedKhalel.Chat.Compositekeys.ParticipantKey;
import MohammedKhalel.Chat.Entity.*;
import MohammedKhalel.Chat.Entity.Enum.ConversationType;
import MohammedKhalel.Chat.Entity.Enum.GroupRoles;
import MohammedKhalel.Chat.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/Conversation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConversationController {

    private final GroupChatService groupChatService;
    private final DirectChatService directChatService;
    private final UserService userService;
    private final ParticipantService participantService;
    private final ConversationService conversationService;

    public record GroupChatRequest(String name, String firstUserPhone) {
    }
    public record DirectChatRequest(String userPhone1, String userPhone2) {
    }
    public record MemberRequest(String userPhone, int groupChatId) {
    }
    public record sendMessageRequest(String userPhone, int ConversationId,String content,String status,
                                     String attachmentUrl,String attachmentType) {
    }

    @PostMapping("/addGroupchat")
    @Operation(summary = "add new Group chat by name and first user phone")
    public void addGroupchat ( @RequestBody GroupChatRequest newGroupChat){
        Groupchat groupchat = new Groupchat();
        groupchat.setType(ConversationType.GroupChat);
        groupchat.setName(newGroupChat.name());
        groupChatService.save(groupchat);
        User firstUser = userService.findUserByPhoneNumber(newGroupChat.firstUserPhone());
        Participant participant = new Participant();
        participant.setParticipantKey(new ParticipantKey(firstUser,groupchat));
        participant.setRole(GroupRoles.Admin);
        participantService.save(participant);
    }

    @PostMapping("/addDirectChat")
    @Operation(summary = "add new Direct Chat userNumber1 and userNumber2")
    private void addDirectChat (@RequestBody DirectChatRequest directChatUsersNumber ){
        DirectChat directChat = new DirectChat();
        directChat.setUser1(userService.findUserByPhoneNumber(directChatUsersNumber.userPhone1()));
        directChat.setUser2(userService.findUserByPhoneNumber(directChatUsersNumber.userPhone2()));
        directChat.setType(ConversationType.DirectChat);
        directChatService.save(directChat);
    }

    @GetMapping("/getConversation/{id}")
    @Operation(summary = "get Conversation data by it is id")
    public Conversation getConversation (@PathVariable("id") int ConversationId){
       return conversationService.findById(ConversationId);
    }
    @GetMapping("/getGroupMembers/{groupId}")
    @Operation(summary = "get all Group chat members by group id")
    public List<Participant> getGroupMembers(@PathVariable("groupId") int groupId){
        return participantService.getGroupMembers(groupId);
    }

    @PostMapping("/getOneParticipant")
    @Operation(summary = "get one participant by User Id and group chat id")
    public Participant getOneParticipant(@RequestBody MemberRequest memberRequest){
        ParticipantKey theKey = new ParticipantKey(userService.findUserByPhoneNumber(memberRequest.userPhone())
                                                  ,groupChatService.getGroupchatById(memberRequest.groupChatId()));
        return participantService.getOneParticipant(theKey);
    }


    @GetMapping("/getConversationMessages/{id}")
    @Operation(summary = "get messages for a Conversation by it is id  ")
    public List<Message> getConversationJoinFetch (@PathVariable("id") int ConversationId){
        return conversationService.findById(ConversationId).getMessages();
    }


    @PostMapping("/getConversationsForUser")
    @Operation(summary = "get All the Conversations For specific User by his phone number")
    public List<Object> getConversationsForUserObject (@RequestBody String userPhone){
        User theUser= userService.findUserByPhoneNumber(userPhone);

        List<DirectChatService.DirectChatForUser> directChats =directChatService.getDirectChatByUserId(theUser.getId());
        List<Groupchat> groupchats = groupChatService.getGroupchatsByUser(theUser);

        List<Object> allConversations = new ArrayList<>();
        allConversations.addAll(directChats);
        allConversations.addAll(groupchats);

        return allConversations;
    }

    public List<Conversation> getConversationsForUser (@RequestBody String userPhone){
        User theUser= userService.findUserByPhoneNumber(userPhone);

        List<DirectChat> directChats =directChatService.getDirectChatByUser(theUser.getId());
        List<Groupchat> groupchats = groupChatService.getGroupchatsByUser(theUser);

        List<Conversation> allConversations = new ArrayList<>();
        allConversations.addAll(directChats);
        allConversations.addAll(groupchats);

        return allConversations;
    }


    @PostMapping("/addGroupMember")
    @Operation(summary = "add new member for a specific group chat")
    public void addGroupMember (@RequestBody MemberRequest memberRequest){

        User theUser = userService.findUserByPhoneNumber(memberRequest.userPhone());
        Groupchat theGroupchat = groupChatService.getGroupchatById(memberRequest.groupChatId());
        Participant theParticipant = new Participant();
        theParticipant.setParticipantKey(new ParticipantKey(theUser,theGroupchat));
        theParticipant.setRole(GroupRoles.Member);
        participantService.save(theParticipant);
    }

    @PostMapping("/sendMessage")
    @Operation(summary = "send a new message in a specific conversation by a specific user")
    public void sendMessage (@RequestBody sendMessageRequest newMessage){
        User theSender = userService.findUserByPhoneNumber(newMessage.userPhone());
        Conversation theConversation = conversationService.findById(newMessage.ConversationId());


        if(getConversationsForUser(newMessage.userPhone()).contains(theConversation)){

            Message theMessage = new Message(theSender,newMessage.content(),newMessage.status(),
                    newMessage.attachmentUrl(),newMessage.attachmentType());

            theConversation.AddMessage(theMessage);
            conversationService.save(theConversation);
        }else {
            throw new RuntimeException("this user "+newMessage.userPhone()+" doesn't belong to this conversation "+
                                         newMessage.ConversationId()+ " :-)");
        }
    }

    @DeleteMapping("/DeleteConversation/{id}")
    @Operation(summary = "Delete single conversation by conversation id")
    public void DeleteConversation (@PathVariable("id") int conversationId){
        conversationService.deleteConversation(conversationId);
    }


}
