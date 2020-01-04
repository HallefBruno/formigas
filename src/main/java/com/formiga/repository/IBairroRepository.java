
package com.formiga.repository;

import com.formiga.entity.Bairro;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IBairroRepository extends JpaRepository<Bairro, Long> {
    
    @Query(value = "FROM Bairro ba INNER JOIN ba.cidade WHERE ba.cidade.id = :idCidade")
    List<Bairro> getListBairro(@Param("idCidade") Long idCidade);
    
   @Query(value = " select bairro.id as id_bairro, bairro.nome as nome_bairro, cidade.id as id_cidade, cidade.nome as nome_cidade, "
                + " estado.id as id_estado, estado.nome as nome_estado,estado.uf, pais.id as id_pais, pais.nome as nome_pais"
                + " from bairro "
                + " inner join cidade on cidade.id = bairro.id_cidade "
                + " inner join estado on estado.id = cidade.id_estado "
                + " inner join pais on pais.id = estado.id_pais "
                + " where cidade.id = :idCidade and  bairro.nome ilike %:term% ", nativeQuery = true)
   List<Object[]> getListBairro(@Param("idCidade") Long idCidade, @Param("term") String term);
    
}
