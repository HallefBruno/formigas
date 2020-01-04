
package com.formiga.service;

import com.formiga.entity.VisitanteCarro;
import com.formiga.entity.exception.VisitanteCarroCadastradoException;
import com.formiga.repository.IVisitanteCarro;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitanteCarroService {
    
    @Autowired
    private IVisitanteCarro iVisitanteCarro;

    @Transactional
    public VisitanteCarro save(VisitanteCarro visitanteCarro) {
        
        Optional<VisitanteCarro> exist = iVisitanteCarro.findByRg(visitanteCarro.getRg());
        
        if(exist.isPresent()) {
            throw new VisitanteCarroCadastradoException("Esse visitante ja foi cadastrado!");
        }
        
        return iVisitanteCarro.save(visitanteCarro);
    }
    
}
