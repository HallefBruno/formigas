package com.formiga.endpoint;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "/")
public class IndexController {

    @RequestMapping("/")
    public ModelAndView pageInitial() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("Dashboard");
        return mv;
    }
  
}
