
package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum Cores {
    
    BRANCA("Branca","#FFFFFF"),
    PRATA("Prata","#bebfbd"),
    PRETA("Preta","#000000"),
    CINZA("Cinza","#C0C0C0"),
    VERMELHA("Vermelha","#FF0000"),
    VERDE("Verde","#4F4F2F"),
    AZUL("Azul","#0000FF"),
    AMARELA("Amarela","#FFFF00"),
    MARROM("Marrom","#A62A2A"),
    OUTRA("Outra","#FFFFFF");
    
    private String value;
    private String hexadecimal;

    private Cores(String value, String hexadecimal) {
        this.value = value;
        this.hexadecimal = hexadecimal;
    }

    public String getValue() {
        return this.value;
    }
    
    public String getHexadecimal() {
        return this.hexadecimal;
    }
    
}
