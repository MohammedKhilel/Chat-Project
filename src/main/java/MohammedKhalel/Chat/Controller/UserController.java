package MohammedKhalel.Chat.Controller;

import MohammedKhalel.Chat.Entity.Conversation;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController  {

    private final UserService userService;


    @PostMapping("/testadding")
    public void testAdding (@RequestBody User theUser){
        userService.save(theUser);
    }

    @GetMapping("/getuserbyphone")
    @Operation(summary = "get user data by his phone number")
    public User getUserByPhone(@RequestBody String phoneNumber){

        return userService.findUserByPhoneNumber(phoneNumber);
    }


}
