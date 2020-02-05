package com.formiga.service;


import com.formiga.entity.CodigoVerificacao;
import com.formiga.entity.Email;
import com.formiga.entity.exception.MessageException;
import com.formiga.repository.ICodigoVerificacaoRepository;
import com.formiga.repository.IEmailRepository;
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

@Service("emailService")
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SimpleMailMessage preConfiguredMessage;
    
    @Autowired
    private IEmailRepository emailRepository;

    @Autowired
    private ICodigoVerificacaoRepository codigoVerificacaoRepository;

    private Long codigoVe;
    
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
}
