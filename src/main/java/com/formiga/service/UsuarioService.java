
package com.formiga.service;

import com.formiga.entity.TipoDeVersoes;
import com.formiga.entity.Usuario;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.IUsuarioRepository;
import com.formiga.security.UsuarioSistema;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    
    @Autowired
    private IUsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    
    @Transactional
    public Usuario save(Usuario u) throws Throwable {
        
        Optional<Usuario> exitUsuario = usuarioRepository.findByEmailIgnoreCase(u.getEmail());
        
        if(exitUsuario.isPresent()) {
            exitUsuario.orElseThrow(() -> new MessageException("Esse usuário já foi cadastrado"));
        }
        
        u.setSenha(passwordEncoder.encode(u.getSenha()));
        u.setConfirmacaoSenha(u.getSenha());
        
        return usuarioRepository.save(u);
    }
    
    public TipoDeVersoes tipoVersao() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TipoDeVersoes versao = ((UsuarioSistema) auth.getPrincipal()).getUsuario().getTipoDeVersoes();
        return versao;
    }
    
}
