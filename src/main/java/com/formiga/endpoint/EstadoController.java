
package com.formiga.endpoint;

import com.formiga.entity.Estado;
import com.formiga.repository.IEstadoRepository;
import com.formiga.service.EstadoService;
import java.util.LinkedList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("estado")
public class EstadoController {
    
    @Autowired
    private IEstadoRepository estadoRepository;
    
    @Autowired
    private EstadoService estadoService;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("estadobairrocidade/StateRegistration");
        return mv;
    }
    
    @RequestMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("estadobairrocidade/EstadoSearch");
        mv.addObject("lista", estadoRepository.findAllByOrderByIdAsc());
        return mv;
    }

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody @Valid Estado estado, BindingResult result) {
        
        
        if (result.hasErrors()) {
            List<String> msgErrosFields = new LinkedList<>();
            result.getAllErrors().forEach((t) -> {
                msgErrosFields.add(t.getDefaultMessage());
            });
            return new ResponseEntity(msgErrosFields, HttpStatus.CONFLICT);
        }
        
        try {
           return ResponseEntity.ok(estadoService.save(estado));
        } catch (Throwable  ex) {
            if(ex.getMessage().contains("constraint")) {
                String message = "Esse estado ja foi cadastrado";
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
            return new ResponseEntity(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }
    
    @GetMapping("list")
    public List<Estado> getAll() {
        return estadoRepository.findAllByOrderByIdAsc();
    }
    
    @GetMapping("search")
    public List<Estado> getListEstado(@RequestParam(required = false, defaultValue = "", name = "param") String param) {
        return estadoRepository.findByNomeContainingIgnoreCase(param);
    }

}
