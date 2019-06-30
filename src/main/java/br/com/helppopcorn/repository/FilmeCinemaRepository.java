package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.FilmeCinema;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Spring Data  repository for the Filme_cinema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmeCinemaRepository extends JpaRepository<FilmeCinema, Long> {
    @Query("select fc from FilmeCinema fc where fc.filme.id in (?1) order by fc.cinema.nome")
    List<FilmeCinema> findByFilmeID(Long filmeId);

    @Query("select fc from FilmeCinema fc where fc.filme.id in (?1) and fc.cinema.id in (?2)")
    FilmeCinema findByFilmeCinemaID(Long filmeId, Long cinemaId);

    @Query("select fc from FilmeCinema fc where fc.cinema.id  = ?1")
    FilmeCinema findByCinemaID(Long cinemaId);
}
