package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Entity.Groupchat;
import MohammedKhalel.Chat.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupChatRepository extends JpaRepository<Groupchat,Integer> {

    List<Groupchat> findByUserContains(User user);
}
