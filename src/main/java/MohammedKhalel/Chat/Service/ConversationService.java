package MohammedKhalel.Chat.Service;

import MohammedKhalel.Chat.Entity.Conversation;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public Conversation findById (int id){

        Optional<Conversation> result = conversationRepository.findById(id);
        if(result.isPresent()){
            return result.get();
        }else {
            throw new RuntimeException("can't find this Conversation id : "+id +" :-)");
        }
    }

    public void save(Conversation conversation){
        conversationRepository.save(conversation);
    }



}
