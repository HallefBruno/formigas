
package com.formiga.endpoint;

import com.formiga.entity.Usuario;
import com.formiga.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("criarconta")
public class CriarContaController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView("CriarConta");
        return mv;
    }
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Usuario u) {
        return ResponseEntity.ok(usuarioService.save(u));
    }
    
}
