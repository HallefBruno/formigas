
package com.formiga.repository;

import com.formiga.entity.MarcaMoto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

/**
 *
 * @author hallef
 */

@Service
public interface IMarcaMotoRepository extends JpaRepository<MarcaMoto, Long>{
    
    @Query(value = "FROM MarcaMoto mm WHERE LOWER(mm.nome) LIKE LOWER(concat('%',?1,'%')) ORDER BY mm.id")
    List<MarcaMoto> getListMarcaMoto(@Param(value = "marca") String marca);
    
}
