
package com.formiga.repository;

import com.formiga.entity.StatusFlyer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IStatusFlyerRepository extends JpaRepository<StatusFlyer, Long> {

    @Query("FROM StatusFlyer sf INNER JOIN sf.filipeta where  sf.filipeta.filipeta like %:flyer%")
    public List<StatusFlyer> searchFlyerStatus(@Param("flyer") String flyer);
    
    @Query(value = " SELECT DISTINCT morador.quadra_lote_nome, morador.id "
         + " FROM (SELECT (pessoa.quadra || ' ' ||pessoa.lote || ' '|| pessoa.nome) AS quadra_lote_nome, pessoa.id FROM resident pessoa) morador "
         + " WHERE morador.quadra_lote_nome ILIKE %:value% ", nativeQuery = true)
    public List<Object[]> searchResident(@Param("value") String value);
}
