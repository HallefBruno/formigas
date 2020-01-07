
package com.formiga.endpoint;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@Controller
public class DashBoardController {
    
    @RequestMapping("dashboard")
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("Dashboard");
        return mv;
    }
    
}
