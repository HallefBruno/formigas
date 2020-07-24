
package com.formiga.repository;

import com.formiga.entity.Moto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */
@Repository
public interface IMotoRepository extends JpaRepository<Moto, Long> {
    
    @Query(value = "SELECT m.id, m.modeloMoto.id,m.modeloMoto.nome, m.modeloMoto.marcaMoto.id, m.modeloMoto.marcaMoto.nome, m.placa, m.cor FROM Moto m INNER JOIN m.modeloMoto INNER JOIN m.resident WHERE m.id = ?1")
    public Object[] getMoto(@Param(value = "id") Long id);
}
