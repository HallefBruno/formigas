package com.formiga.endpoint;

import com.formiga.entity.Flyer;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.MarcaMoto;
import com.formiga.entity.dto.MarcaCarroDTO;
import com.formiga.entity.dto.MarcaMotoDTO;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.IStatusFlyerRepository;
import com.formiga.service.FlyerService;
import com.formiga.service.StatusFlyerService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.formiga.repository.IFlyerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/flyer")
public class FLyerController {
    
    @Autowired
    private FlyerService flyerService;
    
    @Autowired
    private IFlyerRepository flyerRepository;
    
    @Autowired
    private IStatusFlyerRepository statusFlyerRepository;

    @Autowired
    private StatusFlyerService statusFlyerService;
   
    
    @RequestMapping
    public ModelAndView initial() {
        ModelAndView mv = new ModelAndView("FlyerRegistration");
        return mv;
    }
    
    @GetMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("SearchFlyer");
        mv.addObject("todas", flyerRepository.findAllByOrderById());
        return mv;
    }
    
    @PostMapping("searching/{filipetaCod}")
    public ResponseEntity<?> searching(@PathVariable String filipetaCod) {
        return ResponseEntity.ok(flyerService.pesquisaFilipeta(filipetaCod));
    }
    
    @PostMapping("save")
    public ResponseEntity<?> registerFilipeta(@RequestBody Flyer flyer) {
        try {
            return new ResponseEntity(flyerService.save(flyer), HttpStatus.OK);
        } catch(MessageException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            flyerService.delete(Long.valueOf(id));
            return ResponseEntity.ok(flyerRepository.findAllByOrderById());
        }catch(DataIntegrityViolationException e) {
            if(e.getMessage().contains("ConstraintViolationException")) {
                return new ResponseEntity("No presente momento, não será possível excluir esse registro!",HttpStatus.CONFLICT);
            }
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Flyer flyer) {
        MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        try {
            Flyer f = flyerService.save(flyer);
            if(f != null && f.getId() != null) {
                map.add("lista", flyerRepository.findAllByOrderById());
                map.add("message", "Seu registro foi atualizado!");
            }
        } catch(MessageException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(map);
    }
    
    @RequestMapping("link")
    public ModelAndView pageLink() {
        ModelAndView mv = new ModelAndView("LinkFlyer");
        boolean isEmpty = statusFlyerRepository.findAll().isEmpty();
        mv.addObject("listFlyerOff", statusFlyerRepository.findAll());
        mv.addObject("vazio", isEmpty);
        return mv;
    }
    
    @GetMapping("search/{marca}")
    public ResponseEntity<?> listMarca(@PathVariable String marca, @RequestParam("term") final String keywork) {
        
        if(marca.equalsIgnoreCase("car")) {
            MarcaCarroDTO carroDTO;
            List<MarcaCarroDTO> marcas = new ArrayList<>();
            for(MarcaCarro marcaCarro : flyerRepository.searchMarcaCar(keywork.toUpperCase())) {
                if(marcaCarro.getNome().contains(keywork.toUpperCase())) {
                    carroDTO = new MarcaCarroDTO();
                    carroDTO.setLabel(marcaCarro.getNome());
                    carroDTO.setValue(marcaCarro.getId().toString());
                    marcas.add(carroDTO);
                }
            }
            
            return ResponseEntity.ok(marcas);
        } else {
            MarcaMotoDTO motoDTO;
            List<MarcaMotoDTO> marcas = new ArrayList<>();
            
            for(MarcaMoto marcaMoto : flyerRepository.searchMarcaMoto(keywork.toUpperCase())) {
                if(marcaMoto.getNome().contains(keywork.toUpperCase())) {
                    motoDTO = new MarcaMotoDTO();
                    motoDTO.setLabel(marcaMoto.getNome());
                    motoDTO.setValue(marcaMoto.getId().toString());
                    marcas.add(motoDTO);
                }
            }
            return ResponseEntity.ok(marcas);
        }
    }
    
    @GetMapping("search/{idMarca}/{tipo}")
    public ResponseEntity<?> listModelsCarOrMoto(@PathVariable String idMarca, @PathVariable String tipo, @RequestParam(name = "searchTerm", required = false) String searchTerm) {
        return ResponseEntity.ok(flyerService.getListModelsCarOrMoto(Long.parseLong(idMarca),tipo,searchTerm));
    }
    
    @GetMapping("offline")
    public ResponseEntity<?> listFlyerOff(@RequestParam(name = "flyer",value = "") String flyer) {
        return ResponseEntity.ok(statusFlyerRepository.searchFlyerStatus(flyer));
    }

    @PostMapping("save/visitante/{tipoAutomovel}")
    public ResponseEntity<?> saveVisitante(@PathVariable(name = "tipoAutomovel") String tipoAutomovel) {
        
        if(tipoAutomovel!=null) {
            if(tipoAutomovel.equalsIgnoreCase("carro")) {
                
            } else {
                BeanUtils.copyProperties(this, this, "id","teste");
            }
        }
        // BeanUtils.copyProperties(src, target, getNullPropertyNames(src))
        return null;
    }
    
    @GetMapping("search/resident")
    public ResponseEntity<?> listResident(@RequestParam(name = "term", required = false, defaultValue = "") String value) {
        return ResponseEntity.ok(statusFlyerService.searchResultByLoteQuadra(value));
    }
    
}
