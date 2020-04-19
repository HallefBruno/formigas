
package com.formiga.service;

import com.formiga.entity.Bairro;
import com.formiga.repository.IBairroRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hallef
 */
@Service
public class BairroService {
    
    @Autowired
    private IBairroRepository bairroRepository;
    
    @Transactional
    public Bairro save(Bairro bairro) throws Throwable, ConstraintViolationException {
        return bairroRepository.save(bairro);
    }
    
}
