
package com.formiga.endpoint;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("dashboard")
public class DashBoardController {

    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("Dashboard");
        return mv;
    }
    
}
