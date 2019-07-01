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

    @Column(name = "url_imagem")
    private String urlImagem;

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
    public String getUrlImagem() {
        return urlImagem;
    }
    public Filme urlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
        return this;
    }
    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
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
            ", Url Imagem='" + getUrlImagem() + "'" +
            "}";
    }
}
