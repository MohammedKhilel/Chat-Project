package MohammedKhalel.Chat.Controller;

import MohammedKhalel.Chat.Controller.auth.AuthenticateRequest;
import MohammedKhalel.Chat.Controller.auth.AuthenticationResponse;
import MohammedKhalel.Chat.Controller.auth.UserRequest;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController  {

    private final UserService userService;

    public record UpdateRequest(String phoneNumber,String password, String name, String newPassword, String personalPhoto) {
    }


    @PostMapping("/login")
    @Operation(summary = "login and return a token ")
    public ResponseEntity<Object> login (@RequestBody AuthenticateRequest request){
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/signup")
    @Operation(summary = "add new user")
    public ResponseEntity<Object> signUp(@RequestBody UserRequest request){
        if(userService.checkUsedPhone(request.getPhoneNumber())){
            throw new RuntimeException("this phone Number "+request.getPhoneNumber()+" is already Used :-)");
        }else{
            return ResponseEntity.ok(userService.UserRequest(request).getToken());
        }
    }
    @PutMapping("/update")
    @Operation(summary = "update user data")
    public void update (@RequestBody UpdateRequest request){
        userService.update(request.phoneNumber(), request.password(), request.name()
                         , request.newPassword(), request.personalPhoto());
    }


    @PostMapping("/getuserbyphone")
    @Operation(summary = "get user data by his phone number")
    public User getUserByPhone(@RequestBody String phoneNumber){

        return userService.findUserByPhoneNumber(phoneNumber);
    }



}
