package br.com.helppopcorn.web.rest;
import br.com.helppopcorn.domain.Avaliacao;
import br.com.helppopcorn.repository.AvaliacaoRepository;
import br.com.helppopcorn.web.rest.errors.BadRequestAlertException;
import br.com.helppopcorn.web.rest.util.HeaderUtil;
import br.com.helppopcorn.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Avaliacao.
 */
@RestController
@RequestMapping("/api")
public class AvaliacaoResource {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoResource.class);

    private static final String ENTITY_NAME = "avaliacao";

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoResource(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    /**
     * POST  /avaliacaos : Create a new avaliacao.
     *
     * @param avaliacao the avaliacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new avaliacao, or with status 400 (Bad Request) if the avaliacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/avaliacaos")
    public ResponseEntity<Avaliacao> createAvaliacao(@RequestBody Avaliacao avaliacao) throws URISyntaxException {
        log.debug("REST request to save Avaliacao : {}", avaliacao);
        if (avaliacao.getId() != null) {
            throw new BadRequestAlertException("A new avaliacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Avaliacao result = avaliacaoRepository.save(avaliacao);
        return ResponseEntity.created(new URI("/api/avaliacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /avaliacaos : Updates an existing avaliacao.
     *
     * @param avaliacao the avaliacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated avaliacao,
     * or with status 400 (Bad Request) if the avaliacao is not valid,
     * or with status 500 (Internal Server Error) if the avaliacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/avaliacaos")
    public ResponseEntity<Avaliacao> updateAvaliacao(@RequestBody Avaliacao avaliacao) throws URISyntaxException {
        log.debug("REST request to update Avaliacao : {}", avaliacao);
        if (avaliacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Avaliacao result = avaliacaoRepository.save(avaliacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, avaliacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /avaliacaos : get all the avaliacaos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of avaliacaos in body
     */
    @GetMapping("/avaliacaos")
    public ResponseEntity<List<Avaliacao>> getAllAvaliacaos(Pageable pageable) {
        log.debug("REST request to get a page of Avaliacaos");
        Page<Avaliacao> page = avaliacaoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/avaliacaos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/avaliacoes/agruparFilme")
    public List<Avaliacao> getByAvaliacaoFilme(Long filmeId) {
        log.debug("REST request to get all avaliacao");
        return  avaliacaoRepository.findByAvaliacaoFilme(filmeId);
    }

    @GetMapping("/avaliacoes/emailFiltro")
    public ResponseEntity<List<Avaliacao>> getByEmail(@RequestParam(value = "emailUsuario") String emailUsuario, Pageable pageable) {
        Page<Avaliacao> page = avaliacaoRepository.buscarPorEmail(emailUsuario, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/avaliacoes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /avaliacaos/:id : get the "id" avaliacao.
     *
     * @param id the id of the avaliacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the avaliacao, or with status 404 (Not Found)
     */
    @GetMapping("/avaliacaos/{id}")
    public ResponseEntity<Avaliacao> getAvaliacao(@PathVariable Long id) {
        log.debug("REST request to get Avaliacao : {}", id);
        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avaliacao);
    }

    /**
     * DELETE  /avaliacaos/:id : delete the "id" avaliacao.
     *
     * @param id the id of the avaliacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/avaliacaos/{id}")
    public ResponseEntity<Void> deleteAvaliacao(@PathVariable Long id) {
        log.debug("REST request to delete Avaliacao : {}", id);
        avaliacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
