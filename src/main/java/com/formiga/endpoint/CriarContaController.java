
package com.formiga.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("criarconta")
public class CriarContaController {
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("CriarConta");
        return mv;
    }
    
}
