package com.formiga.service;


import com.formiga.entity.CodigoVerificacao;
import com.formiga.entity.Email;
import com.formiga.entity.Mail;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.ICodigoVerificacaoRepository;
import com.formiga.repository.IEmailRepository;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import java.util.Random;
import javax.mail.MessagingException;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SimpleMailMessage preConfiguredMessage;
    
    @Autowired
    private IEmailRepository emailRepository;

    @Autowired
    private ICodigoVerificacaoRepository codigoVerificacaoRepository;
    
    @Autowired
    private Configuration freemarkerConfig;

    private Long codigoVe;

    public void sendMailWithInlineResources(String to, String subject, String body) {

        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setRecipient(Message.RecipientType.CC, new InternetAddress("sudtecnologia@gmail.com"));
            mimeMessage.setFrom(new InternetAddress("sudtecnologia@gmail.com"));
            mimeMessage.setSubject(subject);
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            
            StringBuilder html = new StringBuilder();
            
            codigoVe = getRandomNumberUsingInts(0, 100000);
            Optional<CodigoVerificacao> codigoRepetido = codigoVerificacaoRepository.findByNumeroGerado(codigoVe.toString());
            
            if(codigoRepetido != null && codigoRepetido.isPresent()) {
                while(true) {
                    codigoVe = getRandomNumberUsingInts(0, 100000);
                    codigoRepetido = codigoVerificacaoRepository.findByNumeroGerado(codigoVe.toString());
                    if(codigoRepetido!=null && codigoRepetido.isPresent()) {
                        continue;
                    }
                    break;
                }
            }
            //helper.addAttachment("template", new ClassPathResource("template.eml"));
            html.append("<html>");
            html.append("<body>");
            html.append("<img src='https://res.cloudinary.com/deurqqlk6/image/upload/c_scale,w_116/v1579011864/mascote/mascote-formiga.jpg'/>");
            html.append("<h2>");
            html.append(body).append(codigoVe);
            html.append("</h2>");
            html.append("</body>");
            html.append("</html>");
            helper.setText(html.toString(), true);
        };

        try {
            mailSender.send(preparator);
        } catch (MailException ex) {
            throw ex;
        }
    }
    
    
    public void sendSimpleMessage(String email) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,StandardCharsets.UTF_8.name());

        //helper.addAttachment("logo.png", new ClassPathResource("ideias.png"));
        Mail mail = new Mail();
        
        codigoVe = getRandomNumberUsingInts(0, 100000);
        Optional<CodigoVerificacao> codigoRepetido = codigoVerificacaoRepository.findByNumeroGerado(codigoVe.toString());

        if(codigoRepetido != null && codigoRepetido.isPresent()) {
            while(true) {
                codigoVe = getRandomNumberUsingInts(0, 100000);
                codigoRepetido = codigoVerificacaoRepository.findByNumeroGerado(codigoVe.toString());
                if(codigoRepetido!=null && codigoRepetido.isPresent()) {
                    continue;
                }
                break;
            }
        }
        
        Map<String, Object> model = new HashMap<>();
        model.put("menssagem","Sim, hoje é um dia especial, porque você acaba de ganhar uma licença free !!!");
        model.put("codigo","Seu código de validação é: "+codigoVe);
        model.put("site", "https://brunohallef.wixsite.com/apisudpersistence");
        model.put("logo", "SUD TEC");
        model.put("direitos", "Copyright © S.U.D 2020");
        mail.setModel(model);

        Template t = freemarkerConfig.getTemplate("email-template.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, mail.getModel());

        mail.setFrom("sudtecnologia@gmail.com");
        mail.setTo(email);
        mail.setSubject("Olá, vim trazer seu código de validação.");

        helper.setTo(mail.getTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());
        
        try {
            mailSender.send(message);
        }catch (MailException ex) {
            throw ex;
        }
    }
    
    @Transactional
    public Email save(Email emailDigitado) {
        
        if(codigoVe!=null || emailDigitado.getStatus()) {
            
            Optional<Email> emailCadastrado = emailRepository.findByDescricao(emailDigitado.getDescricao());

            Email email;
            CodigoVerificacao codigoVerificacao;

            if(emailCadastrado != null && emailCadastrado.isPresent()) {
                
                return emailRepository.save(emailDigitado);
                
            } else if(emailDigitado.getStatus() == false) {
                
                email = emailRepository.save(emailDigitado);

                CodigoVerificacao cv = new CodigoVerificacao();
                cv.setEmail(email);
                cv.setNumeroGerado(codigoVe.toString());
                codigoVerificacao = codigoVerificacaoRepository.save(cv);
                
                if(codigoVerificacao == null) {
                    throw new MessageException("Não foi possível salvar codigo verificação");
                }
                
                return email;
            }
        }
        throw new MessageException("Não foi possível salvar o Email !");
    }
    
    public Long getRandomNumberUsingInts(int min, int max) {
        Random random = new Random();
        return random.longs(min, max).findFirst().getAsLong();
    }
    
    
    
    //Este método enviará composição e enviará a mensagem
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);//para
        message.setCc("sudtecnologia@gmail.com");//cópia
        message.setSubject(subject);//define o assunto
        message.setText(body);
        mailSender.send(message);
    }

    //Este método enviará uma mensagem pré-configurada
    public void sendPreConfiguredMail(String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage(preConfiguredMessage);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
}
