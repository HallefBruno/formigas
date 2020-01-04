
package com.formiga.repository;

import com.formiga.entity.Foto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IFotoRepository extends JpaRepository<Foto, String>{
    
    @Query(value = "FROM Foto foto "
            + "INNER JOIN foto.resident "
            + "INNER JOIN foto.resident.bairro "
            + "INNER JOIN foto.resident.bairro.cidade "
            + "INNER JOIN foto.resident.bairro.cidade.estado "
            + "INNER JOIN foto.resident.bairro.cidade.estado.pais "
            + "WHERE foto.resident.id = :idResident ")
    List<Foto> getListPhtoResident(@Param("idResident") Long idResident);
}
