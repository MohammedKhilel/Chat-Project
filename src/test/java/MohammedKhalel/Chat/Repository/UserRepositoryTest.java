package MohammedKhalel.Chat.Repository;

import MohammedKhalel.Chat.Entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void addUser (){

        User theUser= new User(null, "mohammed Khayta", "012035686515", null,
                "12345","Online",null );

        User savedUser = userRepository.save(theUser);

        org.assertj.core.api.Assertions.assertThat(savedUser).isNotNull();
        org.assertj.core.api.Assertions.assertThat(savedUser.getId()).isExactlyInstanceOf(UUID.class);

    }

    @Test
    public void findUsers (){

        User theUser= new User(null, "mohammed Khayta", "012035686515", null,
                "12345","Online",null );
        User theUser2= new User(null, "mohammed Khayta", "012035686515", null,
                "12345","Online",null );

        User savedUser = userRepository.save(theUser);
        User savedUser2 = userRepository.save(theUser2);
        List<User> users= userRepository.findAll();

        org.assertj.core.api.Assertions.assertThat(users).isNotNull();
        org.assertj.core.api.Assertions.assertThat(users.size()).isGreaterThan(2);

    }


    @Test
    public void findUser (){

        User theUser= new User(null, "mohammed Khayta", "012035686515", null,
                "12345","Online",null );

        User savedUser = userRepository.save(theUser);
        User user= userRepository.findByPhoneNumber("012035686515").get();

        org.assertj.core.api.Assertions.assertThat(user).isNotNull();
        org.assertj.core.api.Assertions.assertThat(user).isExactlyInstanceOf(User.class);

    }

    @Test
    public void deleteUser (){

      //  User theUser= new User(null, "mohammed Khayta", "012035686515", null,
        //        "12345","Online",null );

        User savedUser = userRepository.findByPhoneNumber("01129966583").get();
        userRepository.deleteById(savedUser.getId());
        Optional<User> userReturn = userRepository.findById(savedUser.getId());


        org.assertj.core.api.Assertions.assertThat(userReturn).isEmpty();

    }
}
