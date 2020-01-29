
package com.formiga.repository;

import com.formiga.entity.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmailIgnoreCaseAndAtivoTrue(String email);
    
    @Query(value = "select distinct p.nome from Usuario u inner join u.grupos g inner join g.permissoes p where u = :usuario ")
    List<String> permissoes(@Param(value = "usuario") Usuario usuario);
}
