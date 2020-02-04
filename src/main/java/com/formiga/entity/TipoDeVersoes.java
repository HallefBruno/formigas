
package com.formiga.entity;

public enum TipoDeVersoes {
    
    CASA_NUMERADA("Condominio de casas que são identificadas somente pelo número");
    
    private String descricao;
    
    private TipoDeVersoes(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
