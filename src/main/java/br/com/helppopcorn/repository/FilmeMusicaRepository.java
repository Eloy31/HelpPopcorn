package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.FilmeMusica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Filme_musica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmeMusicaRepository extends JpaRepository<FilmeMusica, Long> {
    @Query("select fm from FilmeMusica fm where fm.id_filme in (?1)")
    List<FilmeMusica> findByFilmeID(Long filmeId);

    @Query("select fm from FilmeMusica fm where fm.id_filme in (?1) and fm.id_musica in (?2)")
    FilmeMusica findByFilmeMusicaID(Long filmeId, Long musicaId);

    @Query("select fm from FilmeMusica fm where fm.id_musica  = (?1)")
    FilmeMusica findByMusicaID(Long musicaId);
}
