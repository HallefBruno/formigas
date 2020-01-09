package com.formiga.endpoint;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.formiga.entity.Foto;
import com.formiga.service.FotoService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/fotos")
public class FotosController {
    
    @Autowired
    private FotoService fotoService;
    
    @Value("${app.message}")
    private String ambiente;
    
    @PostMapping("save/{residentName}/{idResident}")
    public ResponseEntity<?> upload(@RequestParam("photo") MultipartFile file, @PathVariable String residentName, @PathVariable String idResident) {
        
        Foto foto = fotoService.storeFoto(file, Long.valueOf(idResident),residentName);
        
        if(foto != null) {
            
            FormigaCloudinary formigaCloudinary = new FormigaCloudinary();
            String photoName;
            
            if(residentName.contains(" ")) {
            
                int space = residentName.indexOf(" ");

                photoName = residentName.substring(0, space).toLowerCase()+"_"+idResident;
                
            } else {
                photoName = residentName.toLowerCase()+"_"+idResident;
            }
            
            if(ambiente.equalsIgnoreCase("prod")) {
                try {
                    
                    formigaCloudinary.savePhotoResident(file.getBytes(), photoName);
                    formigaCloudinary.savePhotoThumbnail(file.getBytes(), "thumbnail"+"-"+photoName);
                    return ResponseEntity.ok().build();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            } else {
                
                String absolutePath = fotoService.folderResidentPhoto().getAbsolutePath();
                String photo = absolutePath+"/"+foto.getFileName();

                try {
                    Files.write(Paths.get(photo), foto.getImage());
                    Thumbnails.of(Paths.get(photo).toString()).size(60, 70).asFiles(Rename.PREFIX_HYPHEN_THUMBNAIL);
                    return ResponseEntity.ok().build();
                } catch (IOException e) {

                    throw new RuntimeException(e);
                }
            }
            
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}














//            try {
//                Path curretPath = Paths.get(".");
//                Path absolutPath = curretPath.toAbsolutePath();
//                int removePonto = absolutPath.toString().indexOf(".");
//                String caminhoFormatado = absolutPath.toString().substring(0, (removePonto-1));
//                byte[] bytes = files.getBytes();
//                File file = new File(caminhoFormatado + "/src/main/resources/static/residentphoto/"+(residentName.toLowerCase()));
//                file.mkdirs();
//                Path path = Paths.get(file.getAbsolutePath()+"/" +residentName+".png");
//                Files.write(path, bytes);
//                return new ResponseEntity<>(HttpStatus.OK);
//            } catch (IOException e) {
//                System.out.println(e.getMessage());
//                return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//            }