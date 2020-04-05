
package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum Cores {
    
    Branca("Branca","#FFFFFF"),
    Prata("Prata","#bebfbd"),
    Preta("Preta","#000000"),
    Cinza("Cinza","#C0C0C0"),
    Vermelha("Vermelha","#FF0000"),
    Verde("Verde","#4F4F2F"),
    Azul("Azul","#0000FF"),
    Amarela("Amarela","#FFFF00"),
    Marrom("Marrom","#A62A2A"),
    Outra("Outra","#FFFFFF");
    
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
