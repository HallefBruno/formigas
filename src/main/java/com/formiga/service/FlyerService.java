package com.formiga.service;

import com.formiga.entity.Flyer;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.Status;
import com.formiga.entity.StatusFlyer;
import com.formiga.entity.dto.CarroMotoDTO;
import com.formiga.entity.exception.MessageException;
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
import com.formiga.repository.IFlyerRepository;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class FlyerService {
    
    @Autowired
    private IFlyerRepository flyerRepository;
    
    @Autowired
    private IStatusFlyerRepository statusFlyerRepository;
    
    @PersistenceContext
    private EntityManager manager;
    
    @Transactional
    public Flyer save(Flyer folheto) {

        Flyer flyer = new Flyer();
        StatusFlyer statusFlyer = new StatusFlyer();
        boolean permiteException = true;
        
        if (folheto != null && folheto.getId() == null) {

            Optional<Flyer> exist = flyerRepository.findByCodFlyer(folheto.getCodFlyer());

            if (exist.isPresent()) {
                throw new MessageException("Essa flyer ja foi cadastrado!");
            }

            flyer = flyerRepository.save(folheto);

            if (folheto.getStatus() == Status.ONLINE) {
                Optional<StatusFlyer> existStausFlyerIdFlyer = statusFlyerRepository.findByFlyerId(flyer.getId());
                if (!existStausFlyerIdFlyer.isPresent()) {
                    statusFlyer.setFlyer(flyer);
                    statusFlyer.setStatus(Status.ONLINE);
                    statusFlyerRepository.save(statusFlyer);
                }
            }

        } else {

            if (folheto != null) {

                flyer = flyerRepository.getOne(folheto.getId());

                if (folheto.getStatus() == Status.OFFLINE && flyer.getStatus() == Status.OFFLINE) {
                    
                    if(flyer.getCodFlyer().equalsIgnoreCase(folheto.getCodFlyer())) {
                        flyer = flyerRepository.save(folheto);
                    } else if(!flyer.getCodFlyer().equalsIgnoreCase(folheto.getCodFlyer())){
                        Optional<Flyer> exist = flyerRepository.findByCodFlyer(folheto.getCodFlyer());
                        if (exist.isPresent()) {
                            throw new MessageException("Essa flyer ja foi cadastrado!");
                        } else {
                            flyer = flyerRepository.save(folheto);
                        }
                    } 
                    
                } else if (flyer.getStatus() == Status.OFFLINE && folheto.getStatus() == Status.ONLINE) {
                    
                    flyer = flyerRepository.getOne(folheto.getId());
                    
                    if(flyer.getCodFlyer().equalsIgnoreCase(folheto.getCodFlyer())) {
                        flyer = flyerRepository.save(folheto);
                        Optional<StatusFlyer> exist = statusFlyerRepository.findByFlyerId(flyer.getId());
                        if(!exist.isPresent()) {
                            statusFlyer.setFlyer(flyer);
                            statusFlyer.setStatus(Status.ONLINE);
                            statusFlyerRepository.save(statusFlyer);
                        }
                    } else if(!flyer.getCodFlyer().equalsIgnoreCase(folheto.getCodFlyer())) {
                        Optional<Flyer> existFlyer = flyerRepository.findByCodFlyer(folheto.getCodFlyer());
                        if (existFlyer.isPresent()) {
                            throw new MessageException("Essa flyer ja foi cadastrado!");
                        } else {
                            flyer = flyerRepository.save(folheto);
                            Optional<StatusFlyer> exist = statusFlyerRepository.findByFlyerId(flyer.getId());
                            if(!exist.isPresent()) {
                                statusFlyer.setFlyer(flyer);
                                statusFlyer.setStatus(Status.ONLINE);
                                statusFlyerRepository.save(statusFlyer);
                            }
                            
                        }
                    }
                    permiteException = false;

                } else {
                    //Necessário pois estava entrando aqui sem precisão.
                    if(permiteException) {
                        throw new MessageException("Não é possível fazer a alteração!");
                    }
                }
            } else {
                throw new MessageException("Houve problema com a entidade!");
            }
        }

        return flyer;
        
    }
    
    //@Transactional
    public void delete(long cod) {
        
        try {
            flyerRepository.deleteById(cod);
        } catch(DataIntegrityViolationException e) {
            throw e;
        }
    }

    public List<Flyer> pesquisaFilipeta(String flyerCod) {
        try {
            Query query = manager.createNativeQuery(" SELECT * FROM FLYER WHERE LOWER(COD_FLYER) LIKE LOWER(?1)");  
            query.setParameter(1, "%" +flyerCod+ "%");
            List<Object[]> listaFilipeta = query.getResultList();
            List<Flyer> result = new ArrayList<>();
            Flyer flyer;
            for (Object[] row : listaFilipeta) {
                flyer = new Flyer();
                flyer.setId(Long.valueOf(row[0].toString()));
                flyer.setCodFlyer(row[1].toString());
                flyer.setCondominio(row[2].toString());
                flyer.setPortaria(row[3].toString());
                flyer.setStatus(Status.valueOf(row[4].toString()));
                result.add(flyer);
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
                List<Object[]> listModelsCar = flyerRepository.modelsCarId(idMarca);
                for (Object[] row : listModelsCar) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            } else {
                List<Object[]> listModelsCar = flyerRepository.modelsCar(idMarca,term);
                for (Object[] row : listModelsCar) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            }
            
        } else {
            
            if(term == null) {
                List<Object[]> listModelMoto = flyerRepository.modelsMotoId(idMarca);
                for (Object[] row : listModelMoto) {
                    carroMotoDTO = new CarroMotoDTO();
                    carroMotoDTO.setId(Long.parseLong(row[0].toString()));
                    carroMotoDTO.setText(row[1].toString());
                    result.add(carroMotoDTO);
                }
            } else {
                List<Object[]> listModelMoto = flyerRepository.modelsMoto(idMarca,term);
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
