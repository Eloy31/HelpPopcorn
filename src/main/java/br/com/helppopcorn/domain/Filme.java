package br.com.helppopcorn.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Filme.
 */
@Entity
@Table(name = "filme")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Filme implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "ano")
    private Integer ano;

    @Column(name = "estudio")
    private String estudio;

    @OneToMany(mappedBy = "filme")
    @Cache (usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set <FilmeMusica> filmeMusicas = new HashSet<>();

    @OneToMany(mappedBy = "filme")
    @Cache (usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set <FilmeCinema> filmeCinemas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    /*----------------------------Atributos do filme---------------------------------- */
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public Filme nome(String nome) {
        this.nome = nome;
        return this;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public Filme descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Integer getAno() {
        return ano;
    }
    public Filme ano(Integer ano) {
        this.ano = ano;
        return this;
    }
    public void setAno(Integer ano) {
        this.ano = ano;
    }
    public String getEstudio() {
        return estudio;
    }
    public Filme estudio(String estudio) {
        this.estudio = estudio;
        return this;
    }
    public void setEstudio(String estudio) {
        this.estudio = estudio;
    }
    /*---------------------------------------------------------------------*/
    
    /*-----------------------------Filme_musica----------------------------*/
    public Set<FilmeMusica> getFilmeMusicas() {
        return filmeMusicas;
    }
    public Filme filmeMusicas(Set<FilmeMusica> filmeMusicas) {
        this.filmeMusicas = filmeMusicas;
        return this;
    }
    public Filme addFilmeMusicas(FilmeMusica filmeMusica) {
        this.filmeMusicas.add(filmeMusica);
        filmeMusica.setFilme(this);
        return this;
    }
    public Filme removeFilmeMusica(FilmeMusica filmeMusica) {
        this.filmeMusicas.remove(filmeMusica);
        filmeMusica.setFilme(null);
        return this;
    }

    public void setFilmeMusicas(Set<FilmeMusica> filmeMusicas){
        this.filmeMusicas = filmeMusicas;
    }
    /*---------------------------------------------------------------------*/

    /*-----------------------------Filme_cinema----------------------------*/
    public Set<FilmeCinema> getFilmeCinemas() {
        return filmeCinemas;
    }
    public Filme filmeCinemas(Set<FilmeCinema> filmeCinemas) {
        this.filmeCinemas = filmeCinemas;
        return this;
    }
    public Filme addFilmeCinemas(FilmeCinema filmeCinema) {
        this.filmeCinemas.add(filmeCinema);
        filmeCinema.setFilme(this);
        return this;
    }
    public Filme removeFilmeCinema(FilmeCinema filmeCinema) {
        this.filmeCinemas.remove(filmeCinema);
        filmeCinema.setFilme(null);
        return this;
    }

    public void setFilmeCinemas(Set<FilmeCinema> filmeCinemas){
        this.filmeCinemas = filmeCinemas;
    }
    /*---------------------------------------------------------------------*/

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Filme filme = (Filme) o;
        if (filme.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), filme.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Filme{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", ano=" + getAno() +
            ", estudio='" + getEstudio() + "'" +
            "}";
    }
}
