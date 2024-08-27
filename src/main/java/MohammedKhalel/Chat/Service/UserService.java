package MohammedKhalel.Chat.Service;


import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

private final UserRepository userRepository;



    public void save (User newUser){
        userRepository.save(newUser);
    }


    public User findUserByPhoneNumber(String phoneNumber){
        Optional<User> result=userRepository.findByPhoneNumber(phoneNumber);
    if(result.isPresent()){
        return result.get();
    }else{
        throw new RuntimeException("can't find this phone Number "+ phoneNumber +" :-)");
    }
    }


//    public List<Object> getAllConversations(String phoneNumber) {
//        User theUser = findUserByPhoneNumber(phoneNumber);
//
//        List<Object> AllConversations=new ArrayList<>();
//        AllConversations.addAll(theUser.getGroupchat());
//        AllConversations.addAll(theUser.getDirectChat());
//        return AllConversations;
//    }
}
