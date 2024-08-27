package MohammedKhalel.Chat.Service;


import MohammedKhalel.Chat.Entity.Participant;
import MohammedKhalel.Chat.Repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public void save (Participant participant){
        participantRepository.save(participant);
    }



}
