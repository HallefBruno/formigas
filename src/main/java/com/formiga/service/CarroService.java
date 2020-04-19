
package com.formiga.service;

import com.formiga.entity.Carro;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.ModeloCarro;
import com.formiga.entity.Resident;
import com.formiga.repository.ICarroRepository;
import com.formiga.repository.IMarcaCarroRepository;
import com.formiga.repository.IModeloCarroRepository;
import com.formiga.repository.IResidentRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hallef
 */

@Service
public class CarroService {
    
    @Autowired
    private ICarroRepository carroRepository;

    @Transactional
    public Carro save(Carro carro) {
        return carroRepository.save(carro);
    }
    
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Object[] getCarro(Long id) {
        return carroRepository.getCarro(id);
    }
    
    @Transactional
    public List<Carro> save(List<Carro> carros) {
        List<Carro> list = carroRepository.saveAll(carros);
        return list;
    }
    
    class CarroDTO {
        
    }
    
}
