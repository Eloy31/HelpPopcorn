package br.com.helppopcorn.repository;

import br.com.helppopcorn.domain.Cinema;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data  repository for the Cinema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Long> {
    @Query("select c from Cinema c where c.id in (?1)")
    Cinema findByIdSimples(Long cinemaId);
}
