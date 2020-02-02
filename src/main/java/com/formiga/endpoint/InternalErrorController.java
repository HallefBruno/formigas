
package com.formiga.endpoint;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class InternalErrorController {
    
    @RequestMapping("500")
    public String init() {
        return "500";
    }
    
}
