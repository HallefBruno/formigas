
package com.formiga.service;

import com.formiga.entity.Moto;
import com.formiga.repository.IMotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hallef
 */
@Service
public class MotoService {
    
    @Autowired
    private IMotoRepository motoRepository;
    
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Moto save(Moto moto) {
        return motoRepository.save(moto);
    }
    
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Object[] getMoto(Long id) {
        return motoRepository.getMoto(id);
    }
    
}
