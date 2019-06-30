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
    @Query("select fm from FilmeMusica fm where fm.filme.id in (?1) order by fm.musica.nome")
    List<FilmeMusica> findByFilmeID(Long filmeId);

    @Query("select fm from FilmeMusica fm where fm.filme.id in (?1) and fm.musica.id in (?2)")
    FilmeMusica findByFilmeMusicaID(Long filmeId, Long musicaId);

    @Query("select fm from FilmeMusica fm where fm.musica.id  = ?1")
    FilmeMusica findByMusicaID(Long musicaId);
}
