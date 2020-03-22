
package com.formiga.endpoint;

import com.formiga.entity.Bairro;
import com.formiga.repository.IBairroRepository;
import com.formiga.service.BairroService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author hallef
 */

@RestController
@RequestMapping("neighborhood")
public class NeighborhoodController {
    
    @Autowired
    private BairroService bairroService;
    
    @Autowired
    private IBairroRepository bairroRepository;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("estadocidadebairro/NeighborhoodRegistration");
        return mv;
    }
    
    @RequestMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("estadocidadebairro/NeighborhoodSearch");
        mv.addObject("todos", bairroRepository.bairros());
        return mv;
    }

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Bairro bairro) {
        try {
            return ResponseEntity.ok(bairroService.save(bairro));
        } catch (Throwable ex) {
            if(ex.getMessage().contains("constraint")) {
                String message = "Esse bairro já foi cadastrado";
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
            return new ResponseEntity(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }
    
    @GetMapping("search")
    public List<Bairro> searchBairro(@RequestParam(defaultValue = "", required = false, name = "param") String param) {
        return bairroRepository.getListBairroParam(param);
    }

}
