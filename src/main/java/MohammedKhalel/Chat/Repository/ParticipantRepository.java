package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Compositekeys.ParticipantKey;
import MohammedKhalel.Chat.Entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ParticipantRepository extends JpaRepository<Participant, ParticipantKey> {

    @Query("SELECT p FROM Participant p WHERE p.participantKey.groupchat.id = :groupchatId")
    List<Participant> findParticipantByGroupchatId(@Param("groupchatId") int groupchatId);

}
