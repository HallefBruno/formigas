
package com.formiga.endpoint;

import com.formiga.entity.Carro;
import com.formiga.service.CarroService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hallef
 */

@RestController
@RequestMapping("carro")
public class CarroController {
    
    @Autowired
    private CarroService carroService;
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Carro carro) {
        return ResponseEntity.ok(carroService.save(carro));
    }
    
    @PostMapping("savelist")
    public ResponseEntity<?> save(@RequestBody List<Carro> carros) {
        return ResponseEntity.ok(carroService.save(carros));
    }
    
}
