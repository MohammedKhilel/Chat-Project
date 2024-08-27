package MohammedKhalel.Chat.Service;

import MohammedKhalel.Chat.Entity.DirectChat;
import MohammedKhalel.Chat.Repository.DirectChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DirectChatService {

    private final DirectChatRepository directChatRepository;

    public void save (DirectChat directChat){
        directChatRepository.save(directChat);
    }

    public DirectChat findById(int directChatId) {
        Optional<DirectChat> result= directChatRepository.findById(directChatId);
        if(result.isPresent()){
            return result.get();
        }else{
        throw new RuntimeException("can't find this directChat Id "+ directChatId +" :-)");
        }
    }

    public List<DirectChat> getDirectChatByUserId (UUID userId){
        return directChatRepository.findDirectChatsByUserId(userId);

    }


}
