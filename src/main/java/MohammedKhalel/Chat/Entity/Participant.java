package MohammedKhalel.Chat.Entity;

import MohammedKhalel.Chat.Entity.Enum.GroupRoles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import MohammedKhalel.Chat.Compositekeys.ParticipantKey;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name="participant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Participant {

    @EmbeddedId
    @JsonIgnore
    private ParticipantKey participantKey;

    @CreationTimestamp
    @Column(name = "join_at", nullable = false, updatable = false)
    private LocalDateTime joinAt;

    private GroupRoles role;

    public Map<String,String> getUserData(){

        Map<String, String> userData = new HashMap<>(Map.of());
        userData.put("PhoneNumber", participantKey.getUser().getPhoneNumber());
        userData.put("photoUrl", participantKey.getUser().getPersonalPhotoUrl());
        userData.put("Status",participantKey.getUser().getStatus());
        userData.put("name",participantKey.getUser().getName());
        return userData;
    }
}
