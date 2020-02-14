
package com.formiga.repository;

import com.formiga.entity.CodigoVerificacao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICodigoVerificacaoRepository extends JpaRepository<CodigoVerificacao, Long>{
    Optional<CodigoVerificacao> findByNumeroGerado(Long id);
    Optional<CodigoVerificacao> findByNumeroGerado(String numeroGerado);
    CodigoVerificacao findByEmailId(Long idEmail);
    CodigoVerificacao findTopByOrderByIdDesc();
}
