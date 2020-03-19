package com.formiga.endpoint;

import com.formiga.entity.Usuario;
import com.formiga.repository.IGrupoRepository;
import com.formiga.repository.IUsuarioRepository;
import com.formiga.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("newuser")
public class UserController {
    
    @Autowired
    private IGrupoRepository grupoRepository;
    
    @Autowired
    private IUsuarioRepository usuarioRepository;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @RequestMapping
    public ModelAndView init() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("UserRegistration");
        mv.addObject("grupos",grupoRepository.findAll());
        return mv;
    }
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Usuario u) {
        
        try {
            return ResponseEntity.ok(usuarioService.save(u));
        } catch(Throwable e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
