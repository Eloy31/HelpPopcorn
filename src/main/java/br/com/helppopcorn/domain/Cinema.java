package br.com.helppopcorn.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Cinema.
 */
@Entity
@Table(name = "cinema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cinema implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "qtd_sala")
    private Integer qtdSala;

    @OneToMany(mappedBy = "cinema")
    @Cache (usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set <FilmeCinema> filmeCinemas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cinema nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCidade() {
        return cidade;
    }

    public Cinema cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public Cinema bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public Integer getQtdsala() {
        return qtdSala;
    }

    public Cinema qtdSala(Integer qtdSala) {
        this.qtdSala = qtdSala;
        return this;
    }

    public void setQtdSala(Integer qtdSala) {
        this.qtdSala = qtdSala;
    }
     /*-----------------------------Filme_cinema----------------------------*/
     public Set<FilmeCinema> getFilmeCinemas() {
        return filmeCinemas;
    }
    public Cinema filmeCinemas(Set<FilmeCinema> filmeCinemas) {
        this.filmeCinemas = filmeCinemas;
        return this;
    }
    public Cinema addFilmeCinemas(FilmeCinema filmeCinema) {
        this.filmeCinemas.add(filmeCinema);
        filmeCinema.setCinema(this);
        return this;
    }
    public Cinema removeFilmeCinema(FilmeCinema filmeCinema) {
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
        Cinema cinema = (Cinema) o;
        if (cinema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cinema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cinema{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", quantidade sala='" + getQtdsala() + "'" +
            "}";
    }
}
