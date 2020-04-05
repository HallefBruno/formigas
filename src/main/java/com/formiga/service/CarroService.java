
package com.formiga.service;

import com.formiga.entity.Carro;
import com.formiga.repository.ICarroRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    
    @Transactional
    public Carro save(List<Carro> carros) {
        List<Carro> list = carroRepository.saveAll(carros);
        return list.get(0);
    }
    
}
