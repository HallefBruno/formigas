package com.formiga.service;

import com.formiga.entity.Filipeta;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.Status;
import com.formiga.entity.StatusFlyer;
import com.formiga.entity.dto.CarroMotoDTO;
import com.formiga.entity.exception.FilipetaCadastradaException;
import com.formiga.repository.IFilipetaRepository;
import com.formiga.repository.IStatusFlyerRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilipetaService {
    
    @Autowired
    private IFilipetaRepository filipetaRepository;
    
    @Autowired
    private IStatusFlyerRepository statusFlyerRepository;
    
    @PersistenceContext
    private EntityManager manager;
    
    @Transactional
    public Filipeta save(Filipeta filipeta) {
        
        Optional<Filipeta> exist = filipetaRepository.findByFilipeta(filipeta.getFilipeta());
        
        if(exist.isPresent()) {
            throw new FilipetaCadastradaException("Essa filipeta ja foi cadastrada");
        }

        Filipeta flyer = filipetaRepository.save(filipeta);
        
        StatusFlyer statusFlyer = new StatusFlyer();
        
        statusFlyer.setFilipeta(flyer);
        statusFlyer.setStatus(Status.OFFLINE);
        
        statusFlyerRepository.save(statusFlyer);
        
        return flyer;
    }
    
    public List<Filipeta> pesquisaFilipeta(String filipetaCod) {
        try {
            Query query = manager.createNativeQuery(" SELECT * FROM FILIPETA WHERE LOWER(FILIPETA) LIKE LOWER(?1)");  
            query.setParameter(1, "%" +filipetaCod+ "%");
            List<Object[]> listaFilipeta = query.getResultList();
            List<Filipeta> result = new ArrayList<>();
            Filipeta filipeta;
            for (Object[] row : listaFilipeta) {
                filipeta = new Filipeta();
                filipeta.setId(Long.valueOf(row[0].toString()));
                filipeta.setCondominio(row[1].toString());
                filipeta.setPortaria(row[2].toString());
                filipeta.setFilipeta(row[3].toString());
                result.add(filipeta);
            }
            return result;
        } catch(NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }
    
    public List<MarcaCarro> searchMarcaCarro(String marca) {
        try {
            Query query = manager.createNativeQuery(" SELECT * FROM MARCAS_CARRO WHERE LOWER(NOME) LIKE LOWER(?1)");  
            query.setParameter(1, "%" +marca+ "%");
            List<Object[]> listMarcas = query.getResultList();
            List<MarcaCarro> result = new ArrayList<>();
            MarcaCarro marcaCarro;
            for (Object[] row : listMarcas) {
                marcaCarro = new MarcaCarro();
                marcaCarro.setId(Long.valueOf(row[0].toString()));
                marcaCarro.setNome(row[1].toString());
                result.add(marcaCarro);
            }
            return result;
        } catch(NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }
    
    public List<CarroMotoDTO> getListModelsCarOrMoto(Long idMarca, String tipo, String term) {
        
        List<CarroMotoDTO> result = new ArrayList<>();
        CarroMotoDTO carroMotoDTO;
        
        if(tipo.equalsIgnoreCase("car")) {
            
            if(term==null) {
                List<Object[]> listModelsCar = filipetaRepository.modelsCarId(idMarca);
                for (Object[] row : listModelsCar) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            } else {
                List<Object[]> listModelsCar = filipetaRepository.modelsCar(idMarca,term);
                for (Object[] row : listModelsCar) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            }
            
        } else {
            
            if(term == null) {
                List<Object[]> listModelMoto = filipetaRepository.modelsMotoId(idMarca);
                for (Object[] row : listModelMoto) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            } else {
                List<Object[]> listModelMoto = filipetaRepository.modelsMoto(idMarca,term);
                for (Object[] row : listModelMoto) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            }
        }
        
        return result;
    }
}
