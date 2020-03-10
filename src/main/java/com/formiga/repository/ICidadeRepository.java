
package com.formiga.repository;

import com.formiga.entity.Cidade;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ICidadeRepository extends JpaRepository<Cidade, Long> {
    
    @Query(value = "FROM Cidade cid INNER JOIN cid.estado WHERE cid.estado.id = :idEstado")
    List<Cidade> getListCity(@Param("idEstado") Long idEstado);
    
    @Query(value = " select cidade.id as id_cidade, estado.id as id_estado, cidade.nome as nome_cidade, estado.nome as nome_estado,"
                 + " estado.uf, pais.id as id_pais, pais.nome as pais_nome"
                 + " from cidade "
                 + " inner join estado on cidade.id_estado = estado.id"
                 + " inner join pais on pais.id = estado.id_pais "
                 + " where cidade.id_estado = :idEstado and cidade.nome ilike %:city% ",nativeQuery = true)
    List<Object[]> getListCity(@Param("idEstado") Long idEstado, @Param("city") String city);
    
    @Query("FROM Cidade cid INNER JOIN  cid.estado ORDER BY cid.id")
    List<Cidade> getListCity();
    
    @Query("FROM Cidade cidade INNER JOIN cidade.estado WHERE LOWER(cidade.nome) LIKE LOWER(concat('%',?1,'%')) ORDER BY cidade.id ")
    List<Cidade> getListCityParam(@Param(value = "param") String param);
}
