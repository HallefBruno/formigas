package com.formiga.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.formiga.entity.Flyer;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.MarcaMoto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface IFlyerRepository extends JpaRepository<Flyer, Long>{
    
    public Optional<Flyer> findByCodFlyer(String codFlyer);
    
    @Query("FROM MarcaCarro where nome like %:keyword%")
    public List<MarcaCarro> searchMarcaCar(@Param("keyword") String keyword);
    
    @Query("FROM MarcaCarro")
    public List<MarcaCarro> searchMarcaCar();
    
    @Query("FROM MarcaMoto where nome like %:keyword%")
    public List<MarcaMoto> searchMarcaMoto(@Param("keyword") String keyword);
    
    
    
    @Query(value = "select modelos_carro.id, modelos_carro.nome as modelo from modelos_carro inner join marcas_carro on(modelos_carro.id_marca_carro = marcas_carro.id) where marcas_carro.id = :idMarcaModelo order by modelos_carro.nome", nativeQuery = true)
    public List<Object[]> modelsCarId(@Param("idMarcaModelo") Long idMarcaModelo);
    @Query(value = "select modelos_moto.id, modelos_moto.nome as modelo from modelos_moto inner join marcas_moto on(modelos_moto.id_marca_moto = marcas_moto.id) where marcas_moto.id = :idMarcaModelo order by marcas_moto.nome", nativeQuery = true)
    public List<Object[]> modelsMotoId(@Param("idMarcaModelo") Long idMarcaModelo);
    
    @Query(value = "select modelos_carro.id, modelos_carro.nome as modelo from modelos_carro inner join marcas_carro on(modelos_carro.id_marca_carro = marcas_carro.id) where marcas_carro.id = :idMarcaModelo and modelos_carro.nome ilike %:term% order by modelos_carro.nome", nativeQuery = true)
    public List<Object[]> modelsCar(@Param("idMarcaModelo") Long idMarcaModelo, @Param("term") String term);
    @Query(value = "select modelos_moto.id, modelos_moto.nome as modelo from modelos_moto inner join marcas_moto on(modelos_moto.id_marca_moto = marcas_moto.id) where marcas_moto.id = :idMarcaModelo and modelos_moto.nome ilike %:term% order by marcas_moto.nome", nativeQuery = true)
    public List<Object[]> modelsMoto(@Param("idMarcaModelo") Long idMarcaModelo, @Param("term") String term);
}
