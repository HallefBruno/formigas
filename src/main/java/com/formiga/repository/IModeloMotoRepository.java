
package com.formiga.repository;

import com.formiga.entity.ModeloMoto;
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
public interface IModeloMotoRepository extends JpaRepository<ModeloMoto, Long> {
    
    @Cacheable(value="motos")
    @Query(value = "FROM ModeloMoto mm INNER JOIN mm.marcaMoto WHERE mm.marcaMoto.id = :idMarca")
    List<ModeloMoto> getListModeloMoto(@Param(value = "idMarca") Long idMarca);
    
    @Query(value = "FROM ModeloMoto mm INNER JOIN mm.marcaMoto WHERE LOWER(mm.nome) LIKE LOWER(concat('%',?1,'%')) AND mm.marcaMoto.id = ?2 ")
    List<ModeloMoto> getListModeloMotoParam(@Param(value = "modelo") String modelo, @Param(value = "idMarca") Long idMarca);
    
}
