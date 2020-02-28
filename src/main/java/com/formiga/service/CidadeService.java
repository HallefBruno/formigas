
package com.formiga.service;

import com.formiga.entity.Cidade;
import com.formiga.repository.ICidadeRepository;
import javax.transaction.Transactional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CidadeService {
    
    @Autowired
    private ICidadeRepository cidadeRepository;
    
    @Transactional
    public Cidade save(Cidade cidade) throws Throwable, ConstraintViolationException {
        return cidadeRepository.save(cidade);
    }
    
}
