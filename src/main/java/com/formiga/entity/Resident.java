
package com.formiga.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"cpf"})})
public class Resident implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    @Column(unique = true)
    private String cpf;
    private String naturalidade;

    @Column(name = "orgao_emissor")
    private String orgaoEmissor;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "data_nascimento")
    private Date dataNascimento;
    
    @Column(name = "estado_civil")
    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;
    
    @Enumerated(EnumType.STRING)
    private Sexo sexo;
    
    @OneToMany(mappedBy = "resident")
    private List<Telefone> telefones;
    
    @OneToMany(mappedBy = "modeloCarro")
    private List<Carro> carros;
    
    @Column(name = "numero_casa")
    private String numeroCasa;
    
    private String apto;
    private String bloco;
    private String napto;
    private String quadra;
    private String lote;
    
    @Column(name = "nome_rua")
    private String nomeRua;
    
    @Column(name = "qtd_moradores")
    private Integer qtdMoradores;
    
    @Column(name = "animal_domestico")
    private boolean animalDomestico;
    
    @PrePersist
    @PreUpdate
    public void retirarCaracterCPF() {
        this.cpf = this.cpf.replace(".", "").replace("-", "");
    }
    
}
