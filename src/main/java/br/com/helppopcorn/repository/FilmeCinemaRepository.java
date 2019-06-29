package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.FilmeCinema;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Filme_cinema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmeCinemaRepository extends JpaRepository<FilmeCinema, Long> {

}
