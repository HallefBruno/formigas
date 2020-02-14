
package com.formiga.service;

import com.formiga.entity.Estado;
import com.formiga.repository.IEstadoRepository;
import javax.transaction.Transactional;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoService {
    
    @Autowired
    private IEstadoRepository estadoRepository;
    
    @Transactional
    public Estado save(Estado atual) throws Throwable, ConstraintViolationException {

        return estadoRepository.save(atual);
        

    }
    
}
