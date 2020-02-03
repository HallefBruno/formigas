
package com.formiga.endpoint;

import com.formiga.entity.CodigoVerificacao;
import com.formiga.entity.Email;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.ICodigoVerificacaoRepository;
import com.formiga.repository.IEmailRepository;
import com.formiga.service.EmailService;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/credenciais")
public class CredenciaisController {
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private ICodigoVerificacaoRepository codigoVerificacaoRepository;
    
    @Autowired
    private IEmailRepository emailRepository;

    @PostMapping("send")
    public ResponseEntity<?> enviarEmail(@RequestBody Email email, HttpServletRequest request) {
        try {
            Optional<Email> emailVerificado = emailRepository.findByDescricao(email.getDescricao());
            
            if(emailVerificado != null && emailVerificado.isPresent()) {
                
                CodigoVerificacao cv = codigoVerificacaoRepository.findByEmailId(emailVerificado.get().getId());
                
                if(cv == null) {
                    emailService.sendMailWithInlineResources(email.getDescricao(), "Formigas online","Código de verificação é: ");
                    return ResponseEntity.ok("E-mail enviado com sucesso! ");
                } else if(emailVerificado.get().getStatus() == true) {
                    return new ResponseEntity(request.getContextPath()+"/login", HttpStatus.OK);
                } else {
                    codigoVerificacaoRepository.delete(cv);
                    emailRepository.delete(emailVerificado.get());
                }
            }
            emailService.sendMailWithInlineResources(email.getDescricao(), "Formigas online","Código de verificação é: ");
            emailService.save(email);

        } catch(MailException | MessageException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok("E-mail enviado com sucesso! ");
    }
    
    @PostMapping("validarcod/{cod}/{emailDigitado}")
    public ResponseEntity<?> verificarCodigoDigitado(@PathVariable String cod, @PathVariable String emailDigitado) {
        Optional<CodigoVerificacao> optional = codigoVerificacaoRepository.findByNumeroGerado(cod);
        try {
            if(optional!=null && optional.isPresent()) {
                CodigoVerificacao cv = optional.get();
                if(cv.getEmail().getDescricao().equals(emailDigitado)) {
                    if(cv.getNumeroGerado().equals(cod)) {
                        Email email = cv.getEmail();
                        email.setStatus(Boolean.TRUE);
                        emailService.save(email);
                        return ResponseEntity.ok().build();
                    }
                } else {
                    return new ResponseEntity<>("Email digitado não é válido para o codigo! ",HttpStatus.NOT_FOUND);
                }
            }
        } catch(MessageException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>("Código inválido! ",HttpStatus.NOT_FOUND);
    }
    
}
