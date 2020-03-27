package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum Sexo {
    
    MASCULINO("Masculino"),
    FEMININO("Feminino");
    
    private String value;

    private Sexo(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
}
