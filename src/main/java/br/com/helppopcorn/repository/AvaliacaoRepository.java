package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.Avaliacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Spring Data  repository for the Avaliacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {    
    @Query("select a from Avaliacao a where LOWER(a.emailUsuario) like LOWER(concat('%',:emailUsuario,'%'))")
    Page buscarPorEmail(@Param("emailUsuario") String nomeUsuario, Pageable pageable);

    @Query("select a from Avaliacao a where a.id in (?1)")
    Avaliacao findByIdSimples(Long avaliacaoId);

}
