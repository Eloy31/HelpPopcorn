package br.com.helppopcorn.web.rest;
import br.com.helppopcorn.domain.FilmeMusica;
import br.com.helppopcorn.repository.FilmeMusicaRepository;
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
 * REST controller for managing Filme_musica.
 */
@RestController
@RequestMapping("/api")
public class FilmeMusicaResource {

    private final Logger log = LoggerFactory.getLogger(FilmeMusicaResource.class);

    private static final String ENTITY_NAME = "filme_musica";

    private final FilmeMusicaRepository filmeMusicaRepository;

    public FilmeMusicaResource(FilmeMusicaRepository filmeMusicaRepository) {
        this.filmeMusicaRepository = filmeMusicaRepository;
    }

    /**
     * POST  /filme-musicas : Create a new filme_musica.
     *
     * @param filme_musica the filme_musica to create
     * @return the ResponseEntity with status 201 (Created) and with body the new filme_musica, or with status 400 (Bad Request) if the filme_musica has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/filme-musicas")
    public ResponseEntity<FilmeMusica> createFilmeMusica(@RequestBody FilmeMusica filmeMusica) throws URISyntaxException {
        log.debug("REST request to save Filme_musica : {}", filmeMusica);
        if (filmeMusica.getId() != null) {
            throw new BadRequestAlertException("A new filme_musica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FilmeMusica result = filmeMusicaRepository.save(filmeMusica);
        return ResponseEntity.created(new URI("/api/filme-musicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /filme-musicas : Updates an existing filme_musica.
     *
     * @param filme_musica the filme_musica to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated filme_musica,
     * or with status 400 (Bad Request) if the filme_musica is not valid,
     * or with status 500 (Internal Server Error) if the filme_musica couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/filme-musicas")
    public ResponseEntity<FilmeMusica> updateFilmeMusica(@RequestBody FilmeMusica filmeMusica) throws URISyntaxException {
        log.debug("REST request to update Filme_musica : {}", filmeMusica);
        if (filmeMusica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FilmeMusica result = filmeMusicaRepository.save(filmeMusica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, filmeMusica.getId().toString()))
            .body(result);
    }

    /**
     * GET  /filme-musicas : get all the filme_musicas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of filme_musicas in body
     */
    @GetMapping("/filme-musicas")
    public List<FilmeMusica> getAllFilmeMusicas() {
        log.debug("REST request to get all Filme_musicas");
        return filmeMusicaRepository.findAll();
    }

    /**
     * GET  /filme-musicas/:id : get the "id" filme_musica.
     *
     * @param id the id of the filme_musica to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the filme_musica, or with status 404 (Not Found)
     */
    @GetMapping("/filme-musicas/{id}")
    public ResponseEntity<FilmeMusica> getFilmeMusica(@PathVariable Long id) {
        log.debug("REST request to get Filme_musica : {}", id);
        Optional<FilmeMusica> filmeMusica = filmeMusicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(filmeMusica);
    }

    /**
     * DELETE  /filme-musicas/:id : delete the "id" filme_musica.
     *
     * @param id the id of the filme_musica to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/filme-musicas/{id}")
    public ResponseEntity<Void> deleteFilmeMusica(@PathVariable Long id) {
        log.debug("REST request to delete Filme_musica : {}", id);
        filmeMusicaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
