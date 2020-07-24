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
import java.util.logging.Level;
import java.util.logging.Logger;
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
    
    @Autowired
    private FormigaCloudinary cloudinary;
    
    @Transactional
    public boolean storeFoto(MultipartFile file, Long idResident, String residentName, String ambiente) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            cloudinary.savePhotoResident(file.getBytes(), residentName, idResident);
            return true;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
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
