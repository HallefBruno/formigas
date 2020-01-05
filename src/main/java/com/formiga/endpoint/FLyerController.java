package com.formiga.endpoint;

import com.formiga.entity.Filipeta;
import com.formiga.entity.MarcaCarro;
import com.formiga.entity.MarcaMoto;
import com.formiga.entity.dto.MarcaCarroDTO;
import com.formiga.entity.dto.MarcaMotoDTO;
import com.formiga.entity.exception.FilipetaCadastradaException;
import com.formiga.repository.IFilipetaRepository;
import com.formiga.repository.IStatusFlyerRepository;
import com.formiga.repository.IVisitanteCarro;
import com.formiga.service.FilipetaService;
import com.formiga.service.StatusFlyerService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/flyer")
public class FLyerController {
    
    @Autowired
    private FilipetaService filipetaService;
    
    @Autowired
    private IFilipetaRepository filipetaRepository;
    
    @Autowired
    private IStatusFlyerRepository statusFlyerRepository;
    
    @Autowired
    private IVisitanteCarro iVisitanteCarro;
    
    @Autowired
    private StatusFlyerService flyerService;
   
    
    @RequestMapping
    public ModelAndView initial() {
        ModelAndView mv = new ModelAndView("FlyerRegistration");
        return mv;
    }
    
    @GetMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("SearchFlyer");
        boolean isEmpty = filipetaRepository.findAll().isEmpty();
        mv.addObject("todas", filipetaRepository.findAll());
        mv.addObject("vazio", isEmpty);
        return mv;
    }
    
    @PostMapping("searching/{filipetaCod}")
    public ResponseEntity<?> searching(@PathVariable String filipetaCod) {
        return ResponseEntity.ok(filipetaService.pesquisaFilipeta(filipetaCod));
    }
    
    @PostMapping("save")
    public ResponseEntity<?> registerFilipeta(@RequestBody Filipeta filipeta) {

        try {
            return ResponseEntity.ok(filipetaService.save(filipeta));
        } catch(FilipetaCadastradaException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
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
            for(MarcaCarro marcaCarro : filipetaRepository.searchMarcaCar(keywork.toUpperCase())) {
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
            
            for(MarcaMoto marcaMoto : filipetaRepository.searchMarcaMoto(keywork.toUpperCase())) {
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
    public ResponseEntity listModelsCarOrMoto(@PathVariable String idMarca, @PathVariable String tipo, @RequestParam(name = "searchTerm", required = false) String searchTerm) {
        return ResponseEntity.ok(filipetaService.getListModelsCarOrMoto(Long.parseLong(idMarca),tipo,searchTerm));
    }
    
    @GetMapping("offline")
    public ResponseEntity listFlyerOff(@RequestParam(name = "flyer",value = "") String flyer) {
        return ResponseEntity.ok(statusFlyerRepository.searchFlyerStatus(flyer));
    }

    @PostMapping("save/visitante/{tipoAutomovel}")
    public ResponseEntity saveVisitante(@PathVariable(name = "tipoAutomovel") String tipoAutomovel) {
        
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
    public ResponseEntity listResident(@RequestParam(name = "term", required = false, defaultValue = "") String value) {
        return ResponseEntity.ok(flyerService.searchResultByLoteQuadra(value));
    }
    
}
