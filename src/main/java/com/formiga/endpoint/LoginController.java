
package com.formiga.endpoint;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    
    @GetMapping("login")
    public String login(@AuthenticationPrincipal User user) {
        if(user!=null) {
            return "redirect:/";
        }
        return "Login";
    }
    
    @GetMapping("403")
    public String acessoNegado403() {
        return "403";
    }
    
}
