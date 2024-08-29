package MohammedKhalel.Chat.Entity;

import MohammedKhalel.Chat.Entity.Enum.GroupRoles;
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

@Entity
@Table(name="participant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Participant {

    @EmbeddedId
    private ParticipantKey participantKey;

    @CreationTimestamp
    @Column(name = "join_at", nullable = false, updatable = false)
    private LocalDateTime joinAt;

    private GroupRoles role;
}
