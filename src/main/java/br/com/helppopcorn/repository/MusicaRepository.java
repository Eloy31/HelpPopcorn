package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.Musica;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data  repository for the Musica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MusicaRepository extends JpaRepository<Musica, Long> {
    @Query("select m from Musica m where LOWER(m.nome) like LOWER(concat('%',:nome,'%'))")
    Page buscarPorNome(@Param("nome") String nome, Pageable pageable);

    @Query("select m from Musica m where LOWER(m.autor) like LOWER(concat('%',:autor,'%'))")
    Page buscarPorAutor(@Param("autor") String autor, Pageable pageable);

    @Query("select m from Musica m where m.id in (?1)")
    Musica findByIdSimples(Long musicaId);
}
