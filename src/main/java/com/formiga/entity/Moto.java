
package com.formiga.entity;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class Moto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_resident")
    private Resident resident;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_modelo_moto")
    private ModeloMoto modeloMoto;
    
    private String placa;
    private String cor;
    
}
