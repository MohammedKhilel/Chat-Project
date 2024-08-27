package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Compositekeys.ParticipantKey;
import MohammedKhalel.Chat.Entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ParticipantRepository extends JpaRepository<Participant, ParticipantKey> {

//    //@Param("userId") is used to pass the UUID parameter to the query.
//    @Query("SELECT p FROM Participant p WHERE p.user.id = :userId")
//    List<Participant> findParticipantsByUserId(@Param("userId") UUID userId);

}
