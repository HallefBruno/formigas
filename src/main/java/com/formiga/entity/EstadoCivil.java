
package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum EstadoCivil {
    
    Casado("Casado(a)"),
    Solteiro("Solteiro(a)"),
    Divorciado("Divorciado(a)"),
    Viuvo("Viuvo(a)");
    
    private String value;

    private EstadoCivil(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
}
