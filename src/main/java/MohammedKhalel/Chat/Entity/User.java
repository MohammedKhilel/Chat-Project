package MohammedKhalel.Chat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String phoneNumber;
    private String personalPhotoUrl;
    private String Password;
    private String status;

    @ManyToMany
    @JoinTable(
            name = "participant",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "groupchat_id"))
    private List<Groupchat> groupchat;

//    @OneToMany(mappedBy = "user1")
//    private List<DirectChat> directChat1;
//
//    @OneToMany(mappedBy = "user2")
//    private List<DirectChat> directChat2;
}


