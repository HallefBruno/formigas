
package com.formiga.service;

import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import org.springframework.stereotype.Service;
import com.formiga.repository.IModeloMotoRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author hallef
 */

@Service
public class ModeloMotoService {
    
    @Autowired
    private IModeloMotoRepository iModeloMotoRepository;
    
    public List<DefaultAutoCompleteSelect2DTO> getListModeloMoto(Long idMarca) {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        iModeloMotoRepository.getListModeloMoto(idMarca).forEach((m) -> {
            list.add(new DefaultAutoCompleteSelect2DTO(m.getId().toString(),m.getNome()));
        });
        return list;
    }
    
}
