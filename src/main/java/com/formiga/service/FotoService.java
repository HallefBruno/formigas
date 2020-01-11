package com.formiga.service;

import com.formiga.endpoint.FormigaCloudinary;
import com.formiga.entity.Foto;
import com.formiga.entity.exception.FileStorageException;
import com.formiga.repository.IFotoRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.transaction.Transactional;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FotoService {

    @Autowired
    private IFotoRepository fotoRepository;
    
    @Transactional
    public Foto storeFoto(MultipartFile file, Long idResident, String residentName, String ambiente) {
        
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        
        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            
            String photoName;
            String contentType = "image/png";
            
            contentType = contentType.substring((contentType.indexOf("/")+1), contentType.length());

            if(residentName.contains(" ")) {
            
                int space = residentName.indexOf(" ");

                photoName = residentName.substring(0, space).toLowerCase()+"_"+idResident+"."+contentType;
                
            } else {
                photoName = residentName.toLowerCase()+"_"+idResident+"."+contentType;
            }
            
            Foto foto = new Foto(photoName, file.getContentType(), file.getBytes(),idResident);

            if(ambiente.equalsIgnoreCase("prod")) {
                
                FormigaCloudinary formigaCloudinary = new FormigaCloudinary();
                
                try {
                    
                    formigaCloudinary.savePhotoResident(file.getBytes(), photoName.substring(0, photoName.indexOf(".")));
                    formigaCloudinary.savePhotoThumbnail(file.getBytes(), "thumbnail"+"-"+photoName.substring(0, photoName.indexOf(".")));

                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            } else {
                
                String photo = folderResidentPhoto().getAbsolutePath()+"/"+foto.getFileName();
                
                try {
                    Files.write(Paths.get(photo), foto.getImage());
                    Thumbnails.of(Paths.get(photo).toString()).size(60, 70).asFiles(Rename.PREFIX_HYPHEN_THUMBNAIL);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            
            return fotoRepository.save(foto);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    
    public File folderResidentPhoto() {
        Path curretPath = Paths.get(".");
        Path absolutPath = curretPath.toAbsolutePath();
        int removePonto = absolutPath.toString().indexOf(".");
        String caminhoFormatado = absolutPath.toString().substring(0, (removePonto - 1));
        File file = new File(caminhoFormatado + "/src/main/resources/static/imagens/resident/");
        return file;
    }

}
