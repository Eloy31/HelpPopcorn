package br.com.helppopcorn.web.rest;
import br.com.helppopcorn.domain.FilmeCinema;
import br.com.helppopcorn.repository.FilmeCinemaRepository;
import br.com.helppopcorn.web.rest.errors.BadRequestAlertException;
import br.com.helppopcorn.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Filme_cinema.
 */
@RestController
@RequestMapping("/api")
public class FilmeCinemaResource {

    private final Logger log = LoggerFactory.getLogger(FilmeCinemaResource.class);

    private static final String ENTITY_NAME = "filme_cinema";

    private final FilmeCinemaRepository filmeCinemaRepository;

    public FilmeCinemaResource(FilmeCinemaRepository filmeCinemaRepository) {
        this.filmeCinemaRepository = filmeCinemaRepository;
    }

    /**
     * POST  /filme-cinemas : Create a new filme_cinema.
     *
     * @param filme_cinema the filme_cinema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new filme_cinema, or with status 400 (Bad Request) if the filme_cinema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/filme-cinemas")
    public ResponseEntity<FilmeCinema> createFilmeCinema(@RequestBody FilmeCinema filmeCinema) throws URISyntaxException {
        log.debug("REST request to save Filme_cinema : {}", filmeCinema);
        if (filmeCinema.getId() != null) {
            throw new BadRequestAlertException("A new filme_cinema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FilmeCinema result = filmeCinemaRepository.save(filmeCinema);
        return ResponseEntity.created(new URI("/api/filme-cinemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /filme-cinemas : Updates an existing filme_cinema.
     *
     * @param filme_cinema the filme_cinema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated filme_cinema,
     * or with status 400 (Bad Request) if the filme_cinema is not valid,
     * or with status 500 (Internal Server Error) if the filme_cinema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/filme-cinemas")
    public ResponseEntity<FilmeCinema> updateFilmeCinema(@RequestBody FilmeCinema filmeCinema) throws URISyntaxException {
        log.debug("REST request to update Filme_cinema : {}", filmeCinema);
        if (filmeCinema.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FilmeCinema result = filmeCinemaRepository.save(filmeCinema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, filmeCinema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /filme-cinemas : get all the filme_cinemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of filme_cinemas in body
     */
    @GetMapping("/filme-cinemas")
    public List<FilmeCinema> getAllFilmeCinemas() {
        log.debug("REST request to get all Filme_cinemas");
        return filmeCinemaRepository.findAll();
    }

    /**
     * GET  /filme-cinemas/:id : get the "id" filme_cinema.
     *
     * @param id the id of the filme_cinema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the filme_cinema, or with status 404 (Not Found)
     */
    @GetMapping("/filme-cinemas/{id}")
    public ResponseEntity<FilmeCinema> getFilmeCinema(@PathVariable Long id) {
        log.debug("REST request to get Filme_cinema : {}", id);
        Optional<FilmeCinema> filmeCinema = filmeCinemaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(filmeCinema);
    }

    /**
     * DELETE  /filme-cinemas/:id : delete the "id" filme_cinema.
     *
     * @param id the id of the filme_cinema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/filme-cinemas/{id}")
    public ResponseEntity<Void> deleteFilmeCinema(@PathVariable Long id) {
        log.debug("REST request to delete Filme_cinema : {}", id);
        filmeCinemaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
