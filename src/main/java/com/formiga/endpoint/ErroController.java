package com.formiga.endpoint;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErroController implements ErrorController {

    @RequestMapping("error")
    public String handleError(HttpServletResponse response) {

        if(response.getStatus() == HttpStatus.NOT_FOUND.value()) {
            return "404";
        } else if (response.getStatus() == 200) {
            try {
                PrintWriter out = response.getWriter();
                out.append("<p style='color:red;'>Um erro ocorreu com o thymeleaf </p>");
                
            } catch (IOException ex) {
                Logger.getLogger(ErroController.class.getName()).log(Level.SEVERE, null, ex);
            }
            return "200";
        } else {
            return "";
        }
    }
 
    @Override
    public String getErrorPath() {
        return "";
    }

}
//else if(response.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
//  modelAndView.setViewName("500");
//}