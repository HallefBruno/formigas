
package com.formiga.service;

import com.formiga.entity.Telefone;
import com.formiga.repository.ITelefoneRepository;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hallef
 */
@Service
public class TelefoneService {
    
    @Autowired
    private ITelefoneRepository telefoneRepository;
    
    @Transactional
    public Telefone save(Telefone telefone) {
        Telefone salvo = telefoneRepository.save(telefone);
        return salvo;
    }
    
    @Transactional
    public List<Telefone> save(List<Telefone> telefone) {
        List<Telefone> list = telefoneRepository.saveAll(telefone);
        return list;
    }
    
}
