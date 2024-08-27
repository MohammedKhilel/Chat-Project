package MohammedKhalel.Chat.Compositekeys;


import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.*;
import MohammedKhalel.Chat.Entity.Groupchat;
import MohammedKhalel.Chat.Entity.User;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantKey implements Serializable {

    @ManyToOne
    private User user;

    @ManyToOne
    private Groupchat groupchat;

}
