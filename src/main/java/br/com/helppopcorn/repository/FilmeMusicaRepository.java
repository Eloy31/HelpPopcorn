package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.FilmeMusica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Filme_musica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmeMusicaRepository extends JpaRepository<FilmeMusica, Long> {

}
