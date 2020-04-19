
package com.formiga.repository;

import com.formiga.entity.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */

@Repository
public interface ICarroRepository extends JpaRepository<Carro, Long> {
    @Query(value = "SELECT c.id, c.modeloCarro.id,c.modeloCarro.nome, c.modeloCarro.marcaCarro.id, c.modeloCarro.marcaCarro.nome, c.placa, c.cor FROM Carro c INNER JOIN c.modeloCarro INNER JOIN c.resident WHERE c.id = ?1")
    public Object[] getCarro(@Param(value = "id") Long id);
}