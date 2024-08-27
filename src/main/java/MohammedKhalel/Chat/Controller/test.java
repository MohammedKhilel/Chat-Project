package MohammedKhalel.Chat.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class test {

    @GetMapping("/String")
    public String getString (){
    return "mohammed";
    }

}
