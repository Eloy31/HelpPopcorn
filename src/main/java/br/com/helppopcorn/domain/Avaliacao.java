package br.com.helppopcorn.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Avaliacao.
 */
@Entity
@Table(name = "avaliacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Avaliacao implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "comentario")
    private String comentario;

    @Column(name = "nota")
    private Integer nota;

    @Column(name = "nome_usuario")
    private String nomeUsuario;

    @Column(name = "email_usuario")
    private String emailUsuario;

    @ManyToOne
    private Filme id_filme;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public Avaliacao comentario(String comentario) {
        this.comentario = comentario;
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public Avaliacao nomeUsuariota(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
        return this;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public Avaliacao emailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
        return this;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public Integer getNota() {
        return nota;
    }

    public Avaliacao nota(Integer nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public Filme getId_filme() {
        return id_filme;
    }

    public Avaliacao id_filme(Filme filme) {
        this.id_filme = filme;
        return this;
    }

    public void setId_filme(Filme filme) {
        this.id_filme = filme;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Avaliacao avaliacao = (Avaliacao) o;
        if (avaliacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), avaliacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Avaliacao{" +
            "id=" + getId() +
            ", comentario='" + getComentario() + "'" +
            ", nota=" + getNota() +
            ", nome=" + getNomeUsuario() +
            ", email=" + getEmailUsuario() +
            "}";
    }
}
