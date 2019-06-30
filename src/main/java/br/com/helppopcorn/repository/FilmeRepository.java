package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.Filme;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data  repository for the Filme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmeRepository extends JpaRepository<Filme, Long> {
    @Query("select f from Filme f where LOWER(f.nome) like LOWER(concat('%',:nome,'%'))")
    Page buscarPorNome(@Param("nome") String nome, Pageable pageable);

    @Query("select f from Filme f where f.id in (?1)")
    Filme findByIdSimples(Long filmeId);
}
