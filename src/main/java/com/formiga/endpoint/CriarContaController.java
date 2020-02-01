
package com.formiga.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CriarContaController {
    
    @RequestMapping("criarconta")
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("CriarConta");
        return mv;
    }
    
}
