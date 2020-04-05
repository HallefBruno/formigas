
package com.formiga.repository;

import com.formiga.entity.Telefone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */
@Repository
public interface ITelefoneRepository extends JpaRepository<Telefone, Long>{
    
}
