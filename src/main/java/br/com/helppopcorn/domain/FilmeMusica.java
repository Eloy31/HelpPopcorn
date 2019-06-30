package br.com.helppopcorn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.*;
import java.io.Serializable;
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
    private Filme id_filme;

    @ManyToOne
    private Musica id_musica;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /*-------------------------Filme--------------------------*/
    public Filme getId_filme() {
        return id_filme;
    }

    public FilmeMusica id_filme(Filme id_filme) {
        this.id_filme = id_filme;
        return this;
    }

    public void setId_filme(Filme id_filme) {
        this.id_filme = id_filme;
    }
    /*-------------------------------------------------------*/

    /*-------------------------Musica--------------------------*/
      public Musica getId_musica() {
        return id_musica;
    }

    public FilmeMusica id_musica(Musica id_musica) {
        this.id_musica = id_musica;
        return this;
    }

    public void setId_musica (Musica id_musica) {
        this.id_musica = id_musica;
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
