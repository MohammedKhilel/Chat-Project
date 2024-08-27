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
import java.util.HashMap;
import java.util.Map;


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


    public Map<String,String> getUser1Data(){
        Map<String,String> userData = new HashMap<>(Map.of());
        userData.put("PhoneNumber",user1.getPhoneNumber());
        userData.put("photoUrl",user1.getPersonalPhotoUrl());
        userData.put("Status",user1.getStatus());
        userData.put("name",user1.getName());
        return userData;
    }

    public Map<String,String> getUser2Data() {
        Map<String, String> userData = new HashMap<>(Map.of());
        userData.put("PhoneNumber", user2.getPhoneNumber());
        userData.put("photoUrl", user2.getPersonalPhotoUrl());
        userData.put("Status",user2.getStatus());
        userData.put("name",user2.getName());
        return userData;
    }
}


