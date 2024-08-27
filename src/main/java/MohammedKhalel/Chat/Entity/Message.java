package MohammedKhalel.Chat.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name="message")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "conversation_id",referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private Conversation conversation;

    @Column(name="content",columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private LocalDateTime updateAt;

    @Column(name = "attachment_url", length = 512)
    private String attachmentUrl;

    private String type;
    private String status;
    private String attachmentType;

    // Custom getter for user phone number
    public String getUserPhoneNumber() {
        return this.user.getPhoneNumber();
    }

}
