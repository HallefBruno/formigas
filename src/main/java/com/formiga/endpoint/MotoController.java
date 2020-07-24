
package com.formiga.endpoint;

import com.formiga.entity.Moto;
import com.formiga.repository.IMotoRepository;
import com.formiga.service.MotoService;
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
@RequestMapping("moto")
public class MotoController {
    
    @Autowired
    private MotoService motoService;
    
    @Autowired
    private IMotoRepository motoRepository;
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Moto moto) {
        Long id = motoService.save(moto).getId();
        return ResponseEntity.ok(motoService.getMoto(id));
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        motoRepository.deleteById(Long.valueOf(id));
        return ResponseEntity.ok().build();
    }
    
}
