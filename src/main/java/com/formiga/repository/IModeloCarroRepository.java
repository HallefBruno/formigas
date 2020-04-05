
package com.formiga.repository;

import com.formiga.entity.ModeloCarro;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */

@Repository
public interface IModeloCarroRepository extends JpaRepository<ModeloCarro, Object> {
    
    @Cacheable(value="carros")
    @Query(value = "FROM ModeloCarro mc INNER JOIN mc.marcaCarro WHERE mc.marcaCarro.id = :idMarca ")
    List<ModeloCarro> getListModelCar(@Param(value = "idMarca") Long idMarca);

    @Query(value = "FROM ModeloCarro mc INNER JOIN mc.marcaCarro WHERE LOWER(mc.nome) LIKE LOWER(concat('%',?1,'%')) AND mc.marcaCarro.id = ?2 ")
    List<ModeloCarro> getListModelCarParam(@Param(value = "modelo") String modelo, @Param(value = "idMarca") Long idMarca);
    
}
