package com.formiga.service;

import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.formiga.repository.IModeloCarroRepository;

/**
 *
 * @author hallef
 */

@Service
public class ModeloCarService {
    
    @Autowired
    private IModeloCarroRepository modeloCarro;
    
    public List<DefaultAutoCompleteSelect2DTO> getListModelCar(String modelo,Long idMarca) {
        
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        
        if ((idMarca != null && idMarca > 0) && (modelo == null || modelo.isEmpty())) {
            modeloCarro.getListModelCar(idMarca).forEach((mc) -> {
                list.add(new DefaultAutoCompleteSelect2DTO(mc.getId().toString(), mc.getNome()));
            });
        } else {
            modeloCarro.getListModelCarParam(modelo, idMarca).forEach((mc) -> {
                list.add(new DefaultAutoCompleteSelect2DTO(mc.getId().toString(), mc.getNome()));
            });
        }
        return list;
    }
    
}
