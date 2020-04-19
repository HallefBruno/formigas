
package com.formiga.endpoint;

import com.formiga.entity.Telefone;
import com.formiga.service.TelefoneService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            telefoneService.delete(Long.valueOf(id));
            return ResponseEntity.ok().build();
        }catch(DataIntegrityViolationException | EmptyResultDataAccessException e) {
            if(e.getMessage().contains("ConstraintViolationException")) {
                return new ResponseEntity("No presente momento, não será possível excluir esse registro!",HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity("Esse registro foi deletado!",HttpStatus.CONFLICT);
            }
        }
    }
    
}
