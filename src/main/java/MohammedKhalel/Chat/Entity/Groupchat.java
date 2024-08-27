package MohammedKhalel.Chat.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "groupchat")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Groupchat extends Conversation{

    private String name;

    private String photoUrl;

    @ManyToMany
    @JoinTable(
            name = "participant",
            joinColumns = @JoinColumn(name = "groupchat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<User> user;

    public List<String> getUsersPhones(){
        List<String> theNumbers = new ArrayList<>();
        for(User user : user ){
            theNumbers.add(user.getPhoneNumber());
        }
        return theNumbers;
    }


}
