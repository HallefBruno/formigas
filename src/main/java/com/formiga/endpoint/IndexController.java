package com.formiga.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController(value = "/")
public class IndexController {

    @RequestMapping("/")
    public ModelAndView pageInitial() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("Index");
        return mv;
    }
  
}
