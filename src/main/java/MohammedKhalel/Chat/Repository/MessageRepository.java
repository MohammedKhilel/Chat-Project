package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Integer> {
}
