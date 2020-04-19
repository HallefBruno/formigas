
package com.formiga.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author hallef
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Carro implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JoinColumn(name="id_modelo_carro")
    @ManyToOne
    private ModeloCarro modeloCarro;
    
    @JoinColumn(name="id_resident")
    @ManyToOne
    private Resident resident;
    
    private String placa;
    private String cor;

}
