package com.formiga.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Filipeta implements Serializable {

    private static final long serialVersionUID = 1103354502657630401L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    private String condominio;

    @NotBlank
    @NotNull
    private String portaria;

    @NotBlank
    @NotNull
    private String filipeta;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCondominio() {
        return condominio;
    }

    public void setCondominio(String condominio) {
        this.condominio = condominio;
    }

    public String getPortaria() {
        return portaria;
    }

    public void setPortaria(String portaria) {
        this.portaria = portaria;
    }

    public String getFilipeta() {
        return filipeta;
    }

    public void setFilipeta(String filipeta) {
        this.filipeta = filipeta;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
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
        Filipeta other = (Filipeta) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

}
