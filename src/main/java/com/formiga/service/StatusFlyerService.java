
package com.formiga.service;

import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.repository.IStatusFlyerRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusFlyerService {
    
    @Autowired
    private IStatusFlyerRepository statusFlyerRepository;
    
    
    public List<DefaultAutoCompleteSelect2DTO> searchResultByLoteQuadra(String value) {

        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        
        if(value!=null && !value.isEmpty()) {
            List<Object[]> residents =  statusFlyerRepository.searchResident(value);
            
            residents.forEach((row) -> {
                list.add(new DefaultAutoCompleteSelect2DTO(row[1].toString(), row[0].toString()));
            });
            
        }
        
        return list;
    }
    
}
