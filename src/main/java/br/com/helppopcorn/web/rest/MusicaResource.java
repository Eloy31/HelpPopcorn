package br.com.helppopcorn.web.rest;
import br.com.helppopcorn.domain.Musica;
import br.com.helppopcorn.repository.MusicaRepository;
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
 * REST controller for managing Musica.
 */
@RestController
@RequestMapping("/api")
public class MusicaResource {

    private final Logger log = LoggerFactory.getLogger(MusicaResource.class);

    private static final String ENTITY_NAME = "musica";

    private final MusicaRepository musicaRepository;

    public MusicaResource(MusicaRepository musicaRepository) {
        this.musicaRepository = musicaRepository;
    }

    /**
     * POST  /musicas : Create a new musica.
     *
     * @param musica the musica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new musica, or with status 400 (Bad Request) if the musica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/musicas")
    public ResponseEntity<Musica> createMusica(@RequestBody Musica musica) throws URISyntaxException {
        log.debug("REST request to save musica : {}", musica);
        if (musica.getId() != null) {
            throw new BadRequestAlertException("A new musica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Musica result = musicaRepository.save(musica);
        return ResponseEntity.created(new URI("/api/musicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /musicas : Updates an existing musica.
     *
     * @param musica the musica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated musica,
     * or with status 400 (Bad Request) if the musica is not valid,
     * or with status 500 (Internal Server Error) if the musica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/musicas")
    public ResponseEntity<Musica> updateMusica(@RequestBody Musica musica) throws URISyntaxException {
        log.debug("REST request to update Musica : {}", musica);
        if (musica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Musica result = musicaRepository.save(musica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, musica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /musicas : get all the musicas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of musicas in body
     */
    @GetMapping("/musicas")
    public List<Musica> getAllMusicas() {
        log.debug("REST request to get all musicas");
        return musicaRepository.findAll();
    }

    /**
     * GET  /musicas/:id : get the "id" musica.
     *
     * @param id the id of the musica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the musica, or with status 404 (Not Found)
     */
    @GetMapping("/musicas/{id}")
    public ResponseEntity<Musica> getMusica(@PathVariable Long id) {
        log.debug("REST request to get Musica : {}", id);
        Optional<Musica> musica = musicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(musica);
    }

    /**
     * DELETE  /musicas/:id : delete the "id" musica.
     *
     * @param id the id of the musica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/musicas/{id}")
    public ResponseEntity<Void> deleteMusica(@PathVariable Long id) {
        log.debug("REST request to delete Musica : {}", id);
        musicaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
