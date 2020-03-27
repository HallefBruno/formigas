
package com.formiga.service;

import com.formiga.entity.MarcaMoto;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.repository.IMarcaMotoRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hallef
 */

@Service
public class MarcaMotoService {
    
    @Autowired
    private IMarcaMotoRepository iMarcaMotoRepository;
    
    public List<DefaultAutoCompleteSelect2DTO> getListMarcaMoto(String marca) {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        iMarcaMotoRepository.getListMarcaMoto(marca).forEach((m) -> {
            list.add(new DefaultAutoCompleteSelect2DTO(m.getId().toString(), m.getNome()));
        });
        return list;
    }
    
}
