package MohammedKhalel.Chat.Service;

import MohammedKhalel.Chat.Entity.DirectChat;
import MohammedKhalel.Chat.Entity.Enum.ConversationType;
import MohammedKhalel.Chat.Repository.DirectChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DirectChatService {

    private final DirectChatRepository directChatRepository;

    public record DirectChatForUser(int id , ConversationType type, Map<String,String> OtherUser,
                                    LocalDateTime createAt,String lastMessage) {
    }

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

    private List<DirectChatForUser> removeUser(List<DirectChat> theList,UUID userId){
        List<DirectChatForUser> directChatForUsers =new ArrayList<>();
        for(DirectChat directChat : theList){
            if (directChat.getUser1().getId()==userId){
                DirectChatForUser directChatForUser = new DirectChatForUser(directChat.getId(),directChat.getType(),
                                        directChat.getUser2Data(),directChat.getCreateAt(),directChat.getLastMessage());
                directChatForUsers.add(directChatForUser);
            }else {
                DirectChatForUser directChatForUser = new DirectChatForUser(directChat.getId(),directChat.getType(),
                                         directChat.getUser1Data(),directChat.getCreateAt(),directChat.getLastMessage());
                directChatForUsers.add(directChatForUser);
            }
        }
        return directChatForUsers;
    }

    public List<DirectChatForUser> getDirectChatByUserId (UUID userId){
        return removeUser(directChatRepository.findDirectChatsByUserId(userId),userId);
    }

    public List<DirectChat>  getDirectChatByUser (UUID userId){
        return directChatRepository.findDirectChatsByUserId(userId);
    }

}
