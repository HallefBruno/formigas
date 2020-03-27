
package com.formiga.repository;

import com.formiga.entity.MarcaCarro;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */

@Repository
public interface IMarcaCarroRepository extends JpaRepository<MarcaCarro, Long> {
    
    @Query(value = "FROM MarcaCarro mc WHERE LOWER(mc.nome) LIKE LOWER(concat('%',?1,'%')) ORDER BY mc.id")
    List<MarcaCarro> getListMarcaCarro(@Param(value = "marca") String marca);
}
