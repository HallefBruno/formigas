package com.formiga.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

@Service
public class EscreverEmailService {

    public File saveEmailInFile(String email) {
        Path curretPath = Paths.get(".");
        Path absolutPath = curretPath.toAbsolutePath();
        int removePonto = absolutPath.toString().indexOf(".");
        String caminhoFormatado = absolutPath.toString().substring(0, (removePonto - 1));
        File file = new File(caminhoFormatado + "/src/main/resources/static/file/emails.txt");

        try {
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
                bw.append(email);
                bw.flush();
                bw.newLine();
            }
        } catch (IOException ex) {
            Logger.getLogger(EscreverEmailService.class.getName()).log(Level.SEVERE, null, ex);
        }

        return file;
    }

    public void escreve(String email) {

//        try {
//            Cloudinary c = new Cloudinary(configOpenCloudinary());
//            URL url;
//            URLConnection urlConn;
//            DataOutputStream dos;
//            DataInputStream dis;
//            
//            url = new URL("https://secure15.syncusercontent.com/mfs-60:03c5f1a917b6db884b40438584b5594c=============================/p/emails.txt?allowdd=0&datakey=mXXSy1V32g2D4ImCBCDL14vAovFIe5SjGQzKgSOVIE7j3aKR/snJ1O7v16zHjG48r2e6GtGv7sSxRxKbYteZH9Io5mDSPFP2ysj2HSb/VmrawogPJJbv3RA1CORkj5ySVhsCMU5OZbqwKIVJu202VHyzKxXPrTGhdwCgMh8TAGangwPTMEhfHYMIrdQmHjT0TPQ7f6vnmrvcxDoQiihu2FJTHsSFSpPMSiR4+RWT4UdxC/gPF9VU0iBvZgTq5fdMCOfqkYqwpizE2LI87XhLmPIC9X/tmk/U/hdeB1q5pe0LEFWhdq9WU56R0m923w37KLO3803Jl4cc2KWzc1vlvw&engine=ln-3.1.28&errurl=ijTpDjNivzrrrpSRxHXNl96FkEP7tZDhZRXixHopsj4sYhjuTYLa8j0u5CCeFNUuy+03b1MiKCO8hJVzmfCJeRKQqxbgi1CvbUiytnvDhZpwazWZhjmKke0N9QGhDvfSjM99jaIosEGcwvV8O30vW6LsPHVSBX7fmSPfPhIPBKhHwCXI9TLLlhtltYmokpIcYpvU4ttIr3RdYbQPBC7RtTq6CGEenJMS0RHkYzneLLj+WBRwMU6tbHPmxHdYzq1567qXokUr6FpFGHzZI8OCEc1SliS+RxpcebugnQzmFvV0Duvi8iWl2rXYMmT7VFx7Q4ESVU4eGA78Io+cUGdiEg==&header1=Q29udGVudC1UeXBlOiB0ZXh0L3BsYWlu&header2=Q29udGVudC1EaXNwb3NpdGlvbjogaW5saW5lOyBmaWxlbmFtZT0iZW1haWxzLnR4dCI7ZmlsZW5hbWUqPVVURi04JydlbWFpbHMudHh0Ow&ipaddress=54a716907893a5767437d6024c86c066bf2d99a7&linkcachekey=99d95f650&linkoid=566010013&mode=100&sharelink_id=4367213270013&timestamp=1579310621161&uagent=2823c49f7b0ec6c56d42a95c000ca0a4830b360b&signature=aa714aa8481a70b20c5029ba3177b019eb2eb430&cachekey=60:03c5f1a917b6db884b40438584b5594c=============================");
//            url.openConnection().addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
//            urlConn = url.openConnection();
//            urlConn.setDoInput(true);
//            urlConn.setDoOutput(true);
//            urlConn.setUseCaches(false);
//            urlConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//            
//            dos = new DataOutputStream(urlConn.getOutputStream());
//            String message = "NEW_ITEM=" + URLEncoder.encode(email);
//            dos.writeBytes(message);
//            dos.flush();
//            dos.close();
//
//            // the server responds by saying 
//            // "SUCCESS" or "FAILURE"
//            dis = new DataInputStream(urlConn.getInputStream());
//            String s = dis.readLine();
//            dis.close();
//
//            
//
//        } // end of "try"
//        catch (MalformedURLException mue) {
//            throw new RuntimeException(mue);
//        } catch (IOException ioe) {
//            throw new RuntimeException(ioe);
//        }

    }

    
}
