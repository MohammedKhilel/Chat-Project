package MohammedKhalel.Chat.Entity;


import MohammedKhalel.Chat.Entity.Enum.ConversationType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="conversation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private int id;

    private ConversationType type;

    @CreationTimestamp
    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createAt;

    //orphanRemoval = true: Automatically deletes a Message if it's removed from the messages list.
    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Message> messages ;

    public void AddMessage(Message theMessage){
        if(messages==null){
            messages=new ArrayList<>();
        }
        messages.add(theMessage);
        theMessage.setConversation(this);
    }

    public String getLastMessage(){
        if(!messages.isEmpty()){
            if(messages.get(messages.size()-1).getContent()!=null){
                return messages.get(messages.size()-1).getContent();
            }else{

                return messages.get(messages.size()-1).getAttachmentType();
            }}else {
            return "";
        }
    }



}
