
package com.formiga.service;

import com.formiga.entity.Bairro;
import com.formiga.entity.Cidade;
import com.formiga.entity.Estado;
import com.formiga.entity.Resident;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.IBairroRepository;
import com.formiga.repository.ICidadeRepository;
import com.formiga.repository.IResidentRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResidentService {
    
    @Autowired
    private ICidadeRepository cidadeRepository;
    
    @Autowired
    private IBairroRepository bairroRepository;
    
    @Autowired
    private IResidentRepository iResidentRepository;
    
    public Resident save(Resident resident) {
//        Optional<Resident> exist = iResidentRepository.findByCpf(resident.getCpf());
//        
//        if(exist.isPresent()) {
//            throw new MessageException("Essa pessoa ja foi cadastrada");
//        }
        
        Resident salvo = iResidentRepository.save(resident);
        
        return salvo;
        
    }
    
    public List<Cidade> getListCity(Long idEstado, String city) {
        
        List<Object[]> list = cidadeRepository.getListCity(idEstado, city);
        List<Cidade> cidades = new ArrayList<>();
        Cidade cidade;
        Estado estado;
        for (Object[] row : list) {
            cidade = new Cidade();
            estado = new Estado();
            cidade.setId(Long.valueOf(row[0].toString()));
            estado.setId(Long.valueOf(row[1].toString()));
            cidade.setNome(row[2].toString());
            estado.setNome(row[3].toString());
            estado.setUf(row[4].toString());
            cidade.setEstado(estado);
            cidades.add(cidade);
        }
        return cidades;
    }
    
    public List<Bairro> getListBairro(Long idEstado, String city) {
        List<Object[]> list = bairroRepository.getListBairro(idEstado, city);
        List<Bairro> bairros = new ArrayList<>();
        Bairro bairro;
        Cidade cidade;
        Estado estado;
        for (Object[] row : list) {
            bairro= new Bairro();
            cidade = new Cidade();
            estado = new Estado();
            bairro.setId(Long.valueOf(row[0].toString()));
            bairro.setNome(row[1].toString());
            cidade.setId(Long.valueOf(row[2].toString()));
            cidade.setNome(row[3].toString());
            estado.setId(Long.valueOf(row[4].toString()));
            estado.setNome(row[5].toString());
            estado.setUf(row[6].toString());
            cidade.setEstado(estado);
            bairro.setCidade(cidade);
            bairros.add(bairro);
        }
        return bairros;
    }
    
    
    
    
}
