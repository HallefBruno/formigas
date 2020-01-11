package com.formiga.endpoint;

import com.formiga.entity.Foto;
import com.formiga.service.FotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/fotos")
public class FotosController {
    
    @Autowired
    private FotoService fotoService;
    
    @Value("${app.message}")
    private String ambiente;
    
    @PostMapping("save/{residentName}/{idResident}")
    public ResponseEntity<?> upload(@RequestParam("photo") MultipartFile file, @PathVariable String residentName, @PathVariable String idResident) {
        
        Foto foto = fotoService.storeFoto(file, Long.valueOf(idResident),residentName, ambiente);
        
        if(foto != null) {
            return new ResponseEntity<>("Foto salva com sucesso!",HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
