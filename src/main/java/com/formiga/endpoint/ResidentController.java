
package com.formiga.endpoint;

import com.formiga.entity.Bairro;
import com.formiga.entity.Cidade;
import com.formiga.entity.Estado;
import com.formiga.entity.Foto;
import com.formiga.entity.Resident;
import com.formiga.entity.dto.DefaultAutoCompleteSelect2DTO;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.IBairroRepository;
import com.formiga.repository.ICidadeRepository;
import com.formiga.repository.IEstadoRepository;
import com.formiga.repository.IFotoRepository;
import com.formiga.repository.IResidentRepository;
import com.formiga.service.FotoService;
import com.formiga.service.ResidentService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
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
    
    @Autowired
    private IEstadoRepository estadoRepository;
    
    @Autowired
    private ICidadeRepository cidadeRepository;
    
    @Autowired
    private IBairroRepository bairroRepository;
    
    @Autowired 
    private ResidentService residentService;
    
    @Autowired
    private IResidentRepository residentRepository;
    
    @Autowired
    private IFotoRepository fotoRepository;
    
    @Autowired
    private FotoService fotoService;
    
    @Value("${app.message}")
    private String ambiente;
    
    @RequestMapping
    public ModelAndView initial() {
        ModelAndView mv = new ModelAndView("ResidentRegistration");
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
        //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        //HttpHeaders respHeaders = new HttpHeaders();
        //respHeaders.add("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        return ResponseEntity.status(HttpStatus.OK)
                .header("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
                .body(fotoRepository.getListPhtoResident(Long.valueOf(codResident)));
    }
    
    @GetMapping("/lists/{qual}/{cod}")
    public ResponseEntity getList(@PathVariable String qual, @PathVariable String cod, @RequestParam(name = "term",required = false, defaultValue = "") String keywork) {
        
        List<DefaultAutoCompleteSelect2DTO> getList = new ArrayList<>();
        
        if(qual != null) {
            
            DefaultAutoCompleteSelect2DTO defaultDTO;
            
            if(qual.equalsIgnoreCase("estado") && cod.equals("0")) {

                for(Estado estado : estadoRepository.findByNomeContainingIgnoreCase(keywork)) {
                    defaultDTO = new DefaultAutoCompleteSelect2DTO();
                    defaultDTO.setText(estado.getNome());
                    defaultDTO.setId(estado.getId().toString());
                    getList.add(defaultDTO);
                }
            } else if(qual.equalsIgnoreCase("cidade")) {
                
                if(cod!=null && (keywork==null || keywork.isEmpty())) {
                
                    for(Cidade cidade : cidadeRepository.getListCity(Long.parseLong(cod))) {
                        defaultDTO = new DefaultAutoCompleteSelect2DTO();
                        defaultDTO.setText(cidade.getNome());
                        defaultDTO.setId(cidade.getId().toString());
                        getList.add(defaultDTO);
                    }
                } else if(keywork!=null) {

                    for(Cidade cidade : residentService.getListCity(Long.parseLong(cod),keywork)) {
                        defaultDTO = new DefaultAutoCompleteSelect2DTO();
                        defaultDTO.setText(cidade.getNome());
                        defaultDTO.setId(cidade.getId().toString());
                        getList.add(defaultDTO);
                    }
                }
            } else {
                if(cod!=null && (keywork==null || keywork.isEmpty())) {
                
                    for(Bairro bairro : bairroRepository.getListBairro(Long.parseLong(cod))) {
                        defaultDTO = new DefaultAutoCompleteSelect2DTO();
                        defaultDTO.setText(bairro.getNome());
                        defaultDTO.setId(bairro.getId().toString());
                        getList.add(defaultDTO);
                    }
                } else if(keywork!=null) {

                    for(Bairro bairro : residentService.getListBairro(Long.parseLong(cod),keywork)) {
                        defaultDTO = new DefaultAutoCompleteSelect2DTO();
                        defaultDTO.setText(bairro.getNome());
                        defaultDTO.setId(bairro.getId().toString());
                        getList.add(defaultDTO);
                    }
                }
            }
        }

        return ResponseEntity.ok(getList);
    }
    
}