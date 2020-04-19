
package com.formiga.endpoint;

import com.formiga.entity.Carro;
import com.formiga.repository.ICarroRepository;
import com.formiga.service.CarroService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hallef
 */

@RestController
@RequestMapping("carro")//cityRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
public class CarroController {
    
    @Autowired
    private CarroService carroService;
    
    @Autowired
    private ICarroRepository carroRepository;
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Carro carro) {
        Long id = carroService.save(carro).getId();
        return ResponseEntity.ok(carroService.getCarro(id));
    }
    
    @PostMapping("savelist")
    public ResponseEntity<?> save(@RequestBody List<Carro> carros) {
        return ResponseEntity.ok(carroService.save(carros));
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        carroRepository.deleteById(Long.valueOf(id));
        return ResponseEntity.ok().build();
    }
    
}
