package br.com.helppopcorn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Filme_cinema.
 */
@Entity
@Table(name = "filme_cinema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FilmeCinema implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private Filme id_filme;

    @ManyToOne
    private Cinema id_cinema;

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

    public FilmeCinema id_filme(Filme id_filme) {
        this.id_filme = id_filme;
        return this;
    }

    public void setId_filme (Filme id_filme) {
        this.id_filme = id_filme;
    }
    /*-------------------------------------------------------*/

    /*-------------------------Cinema--------------------------*/
      public Cinema getId_cinema() {
        return id_cinema;
    }

    public FilmeCinema id_cinema(Cinema id_cinema) {
        this.id_cinema = id_cinema;
        return this;
    }

    public void setid_cinema (Cinema id_cinema) {
        this.id_cinema = id_cinema;
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
        FilmeCinema filmeCinema = (FilmeCinema) o;
        if (filmeCinema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), filmeCinema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Filme cinema{" +
            "id=" + getId() +
            "}";
    }
}
