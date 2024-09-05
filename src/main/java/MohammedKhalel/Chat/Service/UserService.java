package MohammedKhalel.Chat.Service;


import MohammedKhalel.Chat.Config.JwtService;
import MohammedKhalel.Chat.Controller.auth.AuthenticateRequest;
import MohammedKhalel.Chat.Controller.auth.AuthenticationResponse;
import MohammedKhalel.Chat.Controller.auth.UserRequest;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void save (User newUser){
        userRepository.save(newUser);
    }

    public boolean checkUsedPhone(String phoneNumber){
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }


    public User findUserByPhoneNumber(String phoneNumber){
        Optional<User> result=userRepository.findByPhoneNumber(phoneNumber);
    if(result.isPresent()){
        return result.get();
    }else{
        throw new RuntimeException("can't find this phone Number "+ phoneNumber +" :-)");
    }
    }

    public Object authenticate (AuthenticateRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhoneNumber(),request.getPassword()));
        var user = findUserByPhoneNumber(request.getPhoneNumber());
        return jwtService.generateToken(user);
    }

    public AuthenticationResponse UserRequest (UserRequest request){

        User theUser= new User(null, request.getName(), request.getPhoneNumber(), null,
                              passwordEncoder.encode(request.getPassword()),"Online",null );

        userRepository.save(theUser);
        var jwtToken = jwtService.generateToken(theUser);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public void update(String phoneNumber,String password, String name, String newPassword, String personalPhoto) {

        AuthenticateRequest request = new AuthenticateRequest(phoneNumber,password);
        if(authenticate(request)!=null) {

            User theUser = findUserByPhoneNumber(phoneNumber);
            if(name!=null) {
                theUser.setName(name);}
            if(newPassword!=null) {
                theUser.setPassword(passwordEncoder.encode(newPassword));}
            if(personalPhoto!=null) {
                theUser.setPersonalPhotoUrl(personalPhoto);
            }
            userRepository.save(theUser);
        }
    }

}
