package MohammedKhalel.Chat.Controller;

import MohammedKhalel.Chat.Compositekeys.ParticipantKey;
import MohammedKhalel.Chat.Entity.*;
import MohammedKhalel.Chat.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Conversation")
@RequiredArgsConstructor
public class ConversationController {

    private final GroupChatService groupChatService;
    private final DirectChatService directChatService;
    private final UserService userService;
    private final ParticipantService participantService;
    private final ConversationService conversationService;

    public record GroupChatRequest(String name, String firstUserPhone) {
        // No need to write getters, equals, hashCode, or toString methods!
    }

    public record DirectChatRequest(String userNumber1, String userNumber2) {
        // No need to write getters, equals, hashCode, or toString methods!
    }

    @PostMapping("/addGroupchat")
    @Operation(summary = "add new Group chat by name and first user phone")
    public void addGroupchat ( @RequestBody GroupChatRequest newGroupChat){
        Groupchat groupchat = new Groupchat();
        groupchat.setType("Groupchat");
        groupchat.setName(newGroupChat.name());
        groupChatService.save(groupchat);
        User firstUser = userService.findUserByPhoneNumber(newGroupChat.firstUserPhone());
        Participant participant = new Participant();
        participant.setParticipantKey(new ParticipantKey(firstUser,groupchat));
        participant.setRole("Admin");
        participantService.save(participant);
    }

    @PostMapping("/addDirectChat")
    @Operation(summary = "add new Direct Chat userNumber1 and userNumber2")
    private void addDirectChat (@RequestBody DirectChatRequest directChatUsersNumber ){
        DirectChat directChat = new DirectChat();
        directChat.setUser1(userService.findUserByPhoneNumber(directChatUsersNumber.userNumber1()));
        directChat.setUser2(userService.findUserByPhoneNumber(directChatUsersNumber.userNumber2()));
        directChat.setType("DirectChat");
        directChatService.save(directChat);
    }

    @GetMapping("/getConversation/{id}")
    @Operation(summary = "get Conversation data by it is id")
    public Conversation getConversation (@PathVariable("id") int ConversationId){
       return conversationService.findById(ConversationId);
    }


    @GetMapping("/getConversationsForUser")
    @Operation(summary = "get All the Conversations For specific User by his phone number")
    public List<Conversation> getConversationsForUser (@RequestBody String userPhone){
        User theUser= userService.findUserByPhoneNumber(userPhone);

        List<DirectChat> directChats =directChatService.getDirectChatByUserId(theUser.getId());
        List<Groupchat> groupchats = groupChatService.getGroupchatsByUser(theUser);

        List<Conversation> allConversations = new ArrayList<>();
        allConversations.addAll(directChats);
        allConversations.addAll(groupchats);

        return allConversations;
    }

}
