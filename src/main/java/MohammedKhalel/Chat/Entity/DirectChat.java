package MohammedKhalel.Chat.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "directchats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DirectChat extends Conversation{

    @ManyToOne
    @JoinColumn(name = "user1_id",referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id",referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private User user2;


    public String getUser1Number(){
        return this.user1.getPhoneNumber();
    }

    public String getUser2Number(){
        return this.user2.getPhoneNumber();
    }

}


