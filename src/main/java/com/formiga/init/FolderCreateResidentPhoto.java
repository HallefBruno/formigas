
package com.formiga.init;

import com.formiga.entity.Foto;
import com.formiga.repository.IFotoRepository;
import com.formiga.service.FotoService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import javax.annotation.PostConstruct;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FolderCreateResidentPhoto {
 
    private static final Logger LOG = LoggerFactory.getLogger(FolderCreateResidentPhoto.class);
    
    @Autowired
    private FotoService fotoService;
    
    @Autowired
    private IFotoRepository fotoRepository;
    
    @PostConstruct
    private void init() {
        LOG.info("Criando pasta para salvar fotos dos RESIDENTS! ");
        File file = fotoService.folderResidentPhoto();
        if(file.exists()) {
            
            for(File files : file.listFiles()) {
                LOG.info(files.getName());
                files.delete();
            }
            
            if(fotoRepository.findAll().size() > 0) {
                try {
                    for(Foto foto : fotoRepository.findAll()) {
                        Files.write(Paths.get(file.getPath()+"/"+foto.getFileName()), foto.getImage());
                        Thumbnails.of(Paths.get(file.getPath()+"/"+foto.getFileName()).toString()).size(60, 70).asFiles(Rename.PREFIX_HYPHEN_THUMBNAIL);
                    }
                }catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            
            LOG.info("A pasta já foi criada!");
        } else {
            file.mkdirs();
            LOG.info("Pasta para salvar fotos dos RESIDENTS criada!");
        }
    }
 
}
