
package com.formiga.repository;

import com.formiga.entity.Estado;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEstadoRepository extends JpaRepository<Estado, Long> {
    List<Estado> findByNomeContainsIgnoreCaseOrderByIdAsc(String param);
    List<Estado> findAllByOrderByIdAsc();
}
