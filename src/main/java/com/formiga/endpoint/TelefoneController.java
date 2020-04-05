
package com.formiga.endpoint;

import com.formiga.entity.Telefone;
import com.formiga.service.TelefoneService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author halle
 */
@RestController
@RequestMapping("telefone")
public class TelefoneController {
    
    @Autowired
    private TelefoneService telefoneService;
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Telefone telefone) {
        return ResponseEntity.ok(telefoneService.save(telefone));
    }
    
    @PostMapping("savelist")
    public ResponseEntity<?> save(@RequestBody List<Telefone> telefone) {
        return ResponseEntity.ok(telefoneService.save(telefone));
    }
    
}
