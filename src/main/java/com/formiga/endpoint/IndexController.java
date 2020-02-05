package com.formiga.endpoint;

//import com.formiga.entity.Grupo;
//import com.formiga.entity.Permissao;
//import com.formiga.entity.Usuario;
import com.formiga.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "/")
public class IndexController {
    
    @Autowired
    private IUsuarioRepository usuarioRepository;

    @RequestMapping("/")
    public ModelAndView pageInitial() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("Dashboard");
        
//        for(Usuario u : usuarioRepository.findAll()) {
//            System.out.println("Usuarios "+u.getNome());
//            for(Grupo g : u.getGrupos()) {
//                System.out.println("Grupos "+g.getNome());
//                for(Permissao p : g.getPermissoes()) {
//                    System.out.println(" Permissões "+p.getNome());
//                }
//            }
//        }
        
        return mv;
    }
  
}
