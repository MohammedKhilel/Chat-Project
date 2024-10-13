package MohammedKhalel.Chat.Service;


import MohammedKhalel.Chat.Entity.Participant;
import MohammedKhalel.Chat.Repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public void save (Participant participant){
        participantRepository.save(participant);
    }

    public List<Participant> getGroupMembers(int groupId){
        return participantRepository.findParticipantByGroupchatId(groupId);
    }

}
