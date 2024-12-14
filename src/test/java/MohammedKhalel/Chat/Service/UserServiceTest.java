package MohammedKhalel.Chat.Service;

import MohammedKhalel.Chat.Config.JwtService;
import MohammedKhalel.Chat.Controller.auth.AuthenticateRequest;
import MohammedKhalel.Chat.Controller.auth.AuthenticationResponse;
import MohammedKhalel.Chat.Controller.auth.UserRequest;
import MohammedKhalel.Chat.Entity.User;
import MohammedKhalel.Chat.Repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService; // Class under test

    @Mock
    private UserRepository userRepository; // Mock for the repository

    @Mock
    private PasswordEncoder passwordEncoder; // Mock for the password encoder

    @Mock
    private JwtService jwtService; // Mock for JWT token generation

    @Test
    void testUserRequest() {
        // Arrange: Set up input and expected behavior
        UserRequest request = new UserRequest("John Doe", "1234567890", "password123");
        User savedUser = new User(null, "John Doe", "1234567890", null, "encodedPassword", "Online", null);
        String mockJwtToken = "mockJwtToken";

        // Mock password encoding
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");

        // Mock user repository save (to simulate theUser saving)
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Mock JWT token generation
        when(jwtService.generateToken(any(User.class))).thenReturn(mockJwtToken);

        // Act: Call the method being tested
        AuthenticationResponse response = userService.UserRequest(request);

        // Assert: Verify results
        assertNotNull(response); // Ensure the response is not null
        assertEquals(mockJwtToken, response.getToken()); // Verify the token matches the mock

        // verify ensures that each mocked dependency is called the expected number of times with the correct arguments.
        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(any(User.class));
        verify(jwtService, times(1)).generateToken(any(User.class));
    }



}
