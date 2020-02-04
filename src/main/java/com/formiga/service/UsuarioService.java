
package com.formiga.service;

import com.formiga.entity.Usuario;
import com.formiga.repository.IUsuarioRepository;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    
    @Autowired
    private IUsuarioRepository usuarioRepository;
    
    @Transactional
    public Usuario save(Usuario u) {
        return usuarioRepository.save(u);
    }
    
}
