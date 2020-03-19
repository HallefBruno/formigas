
package com.formiga.endpoint;

import com.formiga.entity.Bairro;
import com.formiga.service.BairroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author hallef
 */

@RestController
@RequestMapping("neighborhood")
public class NeighborhoodController {
    
    @Autowired
    private BairroService bairroService;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("estadocidadebairro/NeighborhoodRegistration");
        return mv;
    }

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Bairro bairro) {
        try {
            return ResponseEntity.ok(bairroService.save(bairro));
        } catch (Throwable ex) {
            if(ex.getMessage().contains("constraint")) {
                String message = "Esse bairro ja foi cadastrado";
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
            return new ResponseEntity(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }

}
