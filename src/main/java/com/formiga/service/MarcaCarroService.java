
package com.formiga.service;

import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.formiga.repository.IMarcaCarroRepository;

/**
 *
 * @author hallef
 */

@Service
public class MarcaCarroService {
    
    @Autowired
    private IMarcaCarroRepository marcaCarroRepository;
    
    public List<DefaultAutoCompleteSelect2DTO> getListMarcaCarro(String marca) {
        
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        
        marcaCarroRepository.getListMarcaCarro(marca).forEach((mc) -> {
            list.add(new DefaultAutoCompleteSelect2DTO(mc.getId().toString(), mc.getNome()));
        });
        
        return list;
    }
    
}
