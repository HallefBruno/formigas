
package com.formiga.repository;

import com.formiga.entity.Resident;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IResidentRepository extends JpaRepository<Resident, Long>{
    Optional<Resident> findByCpf(String cpf);
}
