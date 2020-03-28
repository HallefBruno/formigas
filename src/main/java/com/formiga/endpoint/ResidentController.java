
package com.formiga.endpoint;

import com.formiga.entity.Cores;
import com.formiga.entity.EstadoCivil;
import com.formiga.entity.Resident;
import com.formiga.entity.Sexo;
import com.formiga.entity.TipoDeVersoes;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.IFotoRepository;
import com.formiga.service.MarcaCarroService;
import com.formiga.service.MarcaMotoService;
import com.formiga.service.ModeloCarService;
import com.formiga.service.ModeloMotoService;
import com.formiga.service.ResidentService;
import com.formiga.service.UsuarioService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/resident")
public class ResidentController {

    @Autowired private ResidentService residentService;
    
    @Autowired private IFotoRepository fotoRepository;
    
    @Autowired private UsuarioService usuarioService;
    
    @Autowired private MarcaCarroService marcaCarroService;
    
    @Autowired private ModeloCarService modeloCarService;
    
    @Autowired private MarcaMotoService marcaMotoService;
    
    @Autowired private ModeloMotoService modeloMotoService;

    @Value("${app.message}")
    private String ambiente;
    
    @RequestMapping
    public ModelAndView initial() {
        ModelAndView mv = new ModelAndView();
        
        TipoDeVersoes versao = usuarioService.tipoVersao();
        
        if(versao == TipoDeVersoes.CASA_NUMERADA) {
            mv.setViewName("resident/ResidentRegistrationCondCasaNumerada");
        } else {
            mv.setViewName("ResidentRegistration");
        }
        return mv;
    }
    
    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody Resident resident) {
        try {
            return ResponseEntity.ok(residentService.save(resident));
        }catch(MessageException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    
    @GetMapping("page/search")
    public ModelAndView pageSearch() {
        ModelAndView mv = new ModelAndView("SearchResident");
        mv.addObject("ambiente",ambiente);
        return mv;
    }
    
    @GetMapping("search/{codResident}")
    public ResponseEntity listOfResidentsWithPhoto(@PathVariable String codResident) {
        return ResponseEntity.status(HttpStatus.OK).body(fotoRepository.getListPhtoResident(Long.valueOf(codResident)));
    }
    
    @GetMapping("list/marcacar")
    public List<DefaultAutoCompleteSelect2DTO> getListMarcaCarro(@RequestParam(name = "term",required = false, defaultValue = "") String term) {
        return marcaCarroService.getListMarcaCarro(term);
    }
    
    @GetMapping("list/modelo/veiculo/{idMarca}")
    public List<DefaultAutoCompleteSelect2DTO> getListModeloVeiculo(@PathVariable String idMarca) {
        return modeloCarService.getListMarcaCarro(idMarca);
    }
    
    @GetMapping("list/marcamoto")
    public List<DefaultAutoCompleteSelect2DTO> getListMarcaMoto(@RequestParam(name = "term",required = false, defaultValue = "") String term) {
        return marcaMotoService.getListMarcaMoto(term);
    }
    
    @GetMapping("list/modelomoto/{idMarca}")
    public List<DefaultAutoCompleteSelect2DTO> getListModeloMoto(@PathVariable String idMarca) {
        return modeloMotoService.getListModeloMoto(Long.valueOf(idMarca));
    }
    
    @GetMapping("estadocivil")
    public List<DefaultAutoCompleteSelect2DTO> getListEstadoCivil() {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        for(EstadoCivil e : EstadoCivil.values()) {
            list.add(new DefaultAutoCompleteSelect2DTO(e.getValue(), e.getValue()));
        }
        return list;
    }
    
    @GetMapping("sexo")
    public List<DefaultAutoCompleteSelect2DTO> getListSexo() {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        for(Sexo e : Sexo.values()) {
            list.add(new DefaultAutoCompleteSelect2DTO(e.getValue(), e.getValue()));
        }
        return list;
    }
    
    @GetMapping("cores")
    public List<DefaultAutoCompleteSelect2DTO> getListCores() {
        List<DefaultAutoCompleteSelect2DTO> list = new ArrayList<>();
        for(Cores c : Cores.values()) {
            list.add(new DefaultAutoCompleteSelect2DTO(c.getValue(), c.getValue()));
        }
        return list;
    }

}