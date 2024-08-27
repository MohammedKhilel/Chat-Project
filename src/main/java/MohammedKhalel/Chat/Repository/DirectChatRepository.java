package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Entity.DirectChat;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DirectChatRepository extends JpaRepository<DirectChat,Integer> {

    //@Param("userId") is used to pass the UUID parameter to the query.
    @Query("SELECT d FROM DirectChat d WHERE d.user1.id = :userId OR d.user2.id = :userId")
    List<DirectChat> findDirectChatsByUserId(@Param("userId") UUID userId);

}
