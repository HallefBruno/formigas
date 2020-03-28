
package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum Cores {
    
    BRANCA("Branca"),
    PRATA("Prata"),
    PRETA("Preta"),
    CINZA("Cinza"),
    VERMELHA("Vermelha"),
    VERDE("Verde"),
    AZUL("Azul"),
    AMARELA("Amarela");
    
    private String value;

    private Cores(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return this.value;
    }
    
}
