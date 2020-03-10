

package com.formiga.endpoint;

import com.formiga.entity.Cidade;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.repository.ICidadeRepository;
import com.formiga.service.CidadeService;
import com.formiga.service.EstadoService;
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
 * @author halle
 */

@RestController
@RequestMapping("city")
public class CityController {

    @Autowired
    private EstadoService estadoService;
    
    @Autowired
    private CidadeService cidadeService;
    
    @Autowired
    private ICidadeRepository cidadeRepository;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("estadobairrocidade/CityRegistration");
        return mv;
    }

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Cidade cidade) {
        
        try {
           return ResponseEntity.ok(cidadeService.save(cidade));
        } catch (Throwable  ex) {
            if(ex.getMessage().contains("constraint")) {
                String message = "Essa cidade ja foi cadastrado";
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
            return new ResponseEntity(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }
    
    @RequestMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("estadobairrocidade/CitySearch");
        mv.addObject("todas", cidadeRepository.getListCity());
        return mv;
    }
    
    @GetMapping("list/estado")
    public List<DefaultAutoCompleteSelect2DTO> listEstado(@RequestParam(defaultValue = "", required = false, name = "term") String term) {
        return estadoService.listEstadoSelect2(term);
    }
    
    @GetMapping("list/city")
    public List<Cidade> listCity(@RequestParam(defaultValue = "", required = false, name = "param") String param) {
        return cidadeRepository.getListCityParam(param);
    }

}
