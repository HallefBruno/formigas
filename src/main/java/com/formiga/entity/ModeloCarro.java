
package com.formiga.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "modelos_carro")
public class ModeloCarro implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_marca_carro")
    private MarcaCarro marcaCarro;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public MarcaCarro getMarcaCarro() {
        return marcaCarro;
    }

    public void setMarcaCarro(MarcaCarro marcaCarro) {
        this.marcaCarro = marcaCarro;
    }
    
    
    
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ModeloCarro other = (ModeloCarro) obj;
        return Objects.equals(this.id, other.id);
    }

}
