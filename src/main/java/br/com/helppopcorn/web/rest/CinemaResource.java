package br.com.helppopcorn.web.rest;
import br.com.helppopcorn.domain.Cinema;
import br.com.helppopcorn.repository.CinemaRepository;
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
 * REST controller for managing Cinema.
 */
@RestController
@RequestMapping("/api")
public class CinemaResource {

    private final Logger log = LoggerFactory.getLogger(CinemaResource.class);

    private static final String ENTITY_NAME = "cinema";

    private final CinemaRepository cinemaRepository;

    public CinemaResource(CinemaRepository cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }

    /**
     * POST  /cinemas : Create a new cinema.
     *
     * @param cinema the cinema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cinema, or with status 400 (Bad Request) if the cinema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cinemas")
    public ResponseEntity<Cinema> createCinema(@RequestBody Cinema cinema) throws URISyntaxException {
        log.debug("REST request to save Cinema : {}", cinema);
        if (cinema.getId() != null) {
            throw new BadRequestAlertException("A new cinema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cinema result = cinemaRepository.save(cinema);
        return ResponseEntity.created(new URI("/api/cinemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cinemas : Updates an existing cinema.
     *
     * @param cinema the cinema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cinema,
     * or with status 400 (Bad Request) if the cinema is not valid,
     * or with status 500 (Internal Server Error) if the cinema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cinemas")
    public ResponseEntity<Cinema> updateCinema(@RequestBody Cinema cinema) throws URISyntaxException {
        log.debug("REST request to update Cinema : {}", cinema);
        if (cinema.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cinema result = cinemaRepository.save(cinema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cinema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cinemas : get all the cinemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cinemas in body
     */
    @GetMapping("/cinemas")
    public List<Cinema> getAllCinemas() {
        log.debug("REST request to get all Cinemas");
        return cinemaRepository.findAll();
    }

    /**
     * GET  /cinemas/:id : get the "id" cinema.
     *
     * @param id the id of the cinema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cinema, or with status 404 (Not Found)
     */
    @GetMapping("/cinemas/{id}")
    public ResponseEntity<Cinema> getCinema(@PathVariable Long id) {
        log.debug("REST request to get Cinema : {}", id);
        Optional<Cinema> cinema = cinemaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cinema);
    }

    /**
     * DELETE  /cinemas/:id : delete the "id" cinema.
     *
     * @param id the id of the cinema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cinemas/{id}")
    public ResponseEntity<Void> deleteCinema(@PathVariable Long id) {
        log.debug("REST request to delete Cinema : {}", id);
        cinemaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
