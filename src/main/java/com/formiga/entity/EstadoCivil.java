
package com.formiga.entity;

/**
 *
 * @author hallef
 */
public enum EstadoCivil {
    
    CASADO("Casado(a)"),
    SOLTEIRO("Solteiro(a)"),
    DIVORCIADO("Divorciado(a)"),
    VIUVO("Viuvo(a)");
    
    private String value;

    private EstadoCivil(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
    
}
