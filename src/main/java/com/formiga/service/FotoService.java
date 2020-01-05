package com.formiga.service;

import com.formiga.entity.Foto;
import com.formiga.entity.exception.FileStorageException;
import com.formiga.entity.exception.MyFileNotFoundException;
import com.formiga.repository.IFotoRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FotoService {

    @Autowired
    private IFotoRepository fotoRepository;
    
    @Transactional
    public Foto storeFoto(MultipartFile file, Long idResident, String residentName) {
        
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
    
    //list of photos and residents
//    public List<Foto> listOfPhotoAndResident() {
//        
//        List<Foto> listResult = new ArrayList<>();
//        
//        String absolutePath = folderResidentPhoto().getAbsolutePath();
//
//        for(Foto foto : fotoRepository.getListPhtoResident()) {
//            try {
//                
//                String photo = absolutePath+"/"+foto.getFileName();
//                
//                Files.write(Paths.get(photo), foto.getImage());
//                
//            } catch (IOException e) {
//                
//                throw new RuntimeException(e);
//            }
//            
//            listResult.add(foto);
//        }
//        
//        return listResult;
//    }
}
