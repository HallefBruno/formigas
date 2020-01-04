
package com.formiga.repository;

import com.formiga.entity.VisitanteCarro;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IVisitanteCarro extends JpaRepository<VisitanteCarro, Long>{
    
    @Query("FROM VisitanteCarro vc "
         + "INNER JOIN vc.statusFlyer "
         + "INNER JOIN vc.marcaCarro "
         + "INNER JOIN vc.modeloCarro ")
    public List<VisitanteCarro> searchVisitanteCarro();
    
    
    Optional<VisitanteCarro> findByRg(String rg);
}
