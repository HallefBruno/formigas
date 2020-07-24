
package com.formiga.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Usuario implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String email;
    private String senha;
    
    @Transient
    private String confirmacaoSenha;

    private Boolean ativo;
    
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @ManyToMany
    @JoinTable(name = "usuario_grupo", joinColumns = @JoinColumn(name = "id_usuario"),inverseJoinColumns = @JoinColumn(name = "id_grupo"))
    private List<Grupo> grupos;
    
    @Enumerated(EnumType.STRING)
    private TipoDeVersoes tipoDeVersoes;
    
    private Integer tipoUsuario;
    
    @JoinColumn(name = "licenca")
    @OneToOne
    private Licenca licenca;
    
}
