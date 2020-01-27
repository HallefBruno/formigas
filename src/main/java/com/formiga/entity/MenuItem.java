
package com.formiga.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MenuItem implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JoinColumn(name = "id_menu")
    @ManyToOne(fetch = FetchType.LAZY)
    private Menu menu;
    
    
    @Column(name = "url_menu_item", unique = true)
    private String urlMenuItem;
    
    @Column(unique = true)
    private String nomeMenuItem;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public String getUrlMenuItem() {
        return urlMenuItem;
    }

    public void setUrlMenuItem(String urlMenuItem) {
        this.urlMenuItem = urlMenuItem;
    }

    public String getNomeMenuItem() {
        return nomeMenuItem;
    }

    public void setNomeMenuItem(String nomeMenuItem) {
        this.nomeMenuItem = nomeMenuItem;
    }
    
    
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
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
        final MenuItem other = (MenuItem) obj;
        return Objects.equals(this.id, other.id);
    }
    
    
    
}
