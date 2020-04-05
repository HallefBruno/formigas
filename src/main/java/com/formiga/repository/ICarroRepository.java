
package com.formiga.repository;

import com.formiga.entity.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */

@Repository
public interface ICarroRepository extends JpaRepository<Carro, Long>{
    
}
