package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation,Integer> {

    @Query("SELECT c FROM Conversation c JOIN FETCH c.messages WHERE c.id = :conversationId")
    Optional<Conversation> findByIdJoinFetch(@Param("conversationId") int conversationId);




}
