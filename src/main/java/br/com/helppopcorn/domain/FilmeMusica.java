package br.com.helppopcorn.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Filme_musica.
 */
@Entity
@Table(name = "filme_musica")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FilmeMusica implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("filmeMusica")
    private Filme filme;

    @ManyToOne
    @JsonIgnoreProperties("filmeMusica")
    private Musica musica;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /*-------------------------Filme--------------------------*/
    public Filme getFilme() {
        return filme;
    }

    public FilmeMusica filmeMusica(Filme filme) {
        this.filme = filme;
        return this;
    }

    public void setFilme (Filme filme) {
        this.filme = filme;
    }
    /*-------------------------------------------------------*/

    /*-------------------------Musica--------------------------*/
      public Musica getMusica() {
        return musica;
    }

    public FilmeMusica filmeMusica(Musica musica) {
        this.musica = musica;
        return this;
    }

    public void setMusica (Musica musica) {
        this.musica = musica;
    }
    /*-------------------------------------------------------*/
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FilmeMusica filmeMusica = (FilmeMusica) o;
        if (filmeMusica.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), filmeMusica.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Filme musica{" +
            "id=" + getId() +
            "}";
    }
}
