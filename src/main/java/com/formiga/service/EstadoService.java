
package com.formiga.service;

import com.formiga.entity.Estado;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.repository.IEstadoRepository;
import java.util.ArrayList;
import java.util.List;
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
    
    public List<DefaultAutoCompleteSelect2DTO> listEstadoSelect2(String param) {
        
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        DefaultAutoCompleteSelect2DTO autoCompleteSelect2DTO;
        
        for(Estado e : estadoRepository.findByNomeContainsIgnoreCaseOrderByIdAsc(param)) {
            autoCompleteSelect2DTO = new DefaultAutoCompleteSelect2DTO(e.getId().toString(), e.getNome());
            list.add(autoCompleteSelect2DTO);
        }
        return list;
    }
    
}
