package MohammedKhalel.Chat.Service;

import MohammedKhalel.Chat.Entity.Groupchat;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Repository.GroupChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupChatService {

    private final GroupChatRepository groupChatRepository;

    public void save (Groupchat groupchat){
        groupChatRepository.save(groupchat);
    }

    public Groupchat getGroupchatById(int theId){
        Optional<Groupchat> result = groupChatRepository.findById(theId);
        if(result.isPresent()){
            return result.get();
        }else{
         throw new RuntimeException("can't find this Groupchat Id "+ theId +" :-)");
        }
    }

    public List<Groupchat> getGroupchatsByUser(User theUser){
       return groupChatRepository.findByUserContains(theUser);
    }

}
