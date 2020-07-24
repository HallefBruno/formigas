
package com.formiga.service;

import com.formiga.entity.Cidade;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.repository.ICidadeRepository;
import java.util.ArrayList;
import java.util.List;
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
    
    public List<DefaultAutoCompleteSelect2DTO> getListCity(Long idEstado, String param) {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        
        if(idEstado != null && param==null || param.isEmpty()) {
            cidadeRepository.getListCity(idEstado).forEach((c) -> {
                list.add(new DefaultAutoCompleteSelect2DTO(c.getId().toString(),c.getNome()));
            });
        } else {
            cidadeRepository.getListCity(idEstado, param).forEach((c) -> {
                list.add(new DefaultAutoCompleteSelect2DTO(c[0].toString(),c[1].toString()));
            });
        }
        
                
        return list;
    }
    
}
