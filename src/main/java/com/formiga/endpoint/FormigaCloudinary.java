package com.formiga.endpoint;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Map;

public class FormigaCloudinary {

    private Map configOpenCloudinary() {
        Map chave = ObjectUtils.asMap(
                "cloud_name", "hgefhowox",
                "api_key","621959836883296",
                "api_secret","LT3_ARgtuOtxM61l5QtXceT2S14");
        return chave;
    }
    
    public Map savePhotoThumbnail(byte[] dataImage, String residentName) throws IOException {
        Map conf = ObjectUtils.asMap("public_id", "resident/" + residentName,"transformation", new Transformation().width(50).height(50).gravity("face").crop("fill").radius("max"));
        Cloudinary cloudinary = new Cloudinary(configOpenCloudinary());
        return cloudinary.uploader().upload(dataImage, conf);//.gravity("face")
    }
    
    public Map savePhotoResident(byte[] dataImage, String residentName) throws IOException {
        Map conf = ObjectUtils.asMap("public_id", "resident/" + residentName);
        Cloudinary cloudinary = new Cloudinary(configOpenCloudinary());
        return cloudinary.uploader().upload(dataImage, conf);//.gravity("face")
    }

}


//public static void main(String[] args) throws IOException, Exception {
//        
//        //new FormigaCloudinary().teste();
//        
//        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", "hgefhowox",
//                "api_key", "621959836883296",
//                "api_secret", "LT3_ARgtuOtxM61l5QtXceT2S14"));
//
//        File toUpload = new File("C:\\Users\\halle\\Documents\\NetBeansProjects\\formiga\\src\\main\\resources\\static\\imagens\\projectavatar.png");
//        Map params = ObjectUtils.asMap("public_id", "resident/" + "teste",
//                "transformation", new Transformation().width(90).height(98).crop("thumb").gravity("face").radius("max"));
//        cloudinary.uploader().upload(toUpload, params);
//
//        //https://res.cloudinary.com/hgefhowox/image/upload/v1578512699/resident/imagem-sem-foto.jpg
//
//    }
//
//    public void teste() throws Exception {
//        Map config = ObjectUtils.asMap(
//                "cloud_name", "hgefhowox",
//                "api_key", "621959836883296",
//                "api_secret", "LT3_ARgtuOtxM61l5QtXceT2S14");
//
//        Cloudinary cloudinary = new Cloudinary(config);
//
//        Api api = cloudinary.api();
//
//        JSONObject outerObject;
//
//        String jsonNext = null;
//
//        boolean ifWeHaveMoreResources = true;
//
//        ArrayList<String> listRes = new ArrayList<>();
//
//        while (ifWeHaveMoreResources) {
//
//            outerObject = new JSONObject(api.resources(ObjectUtils.asMap("max_results", 500, "next_cursor", jsonNext)));
//
//            if (outerObject.has("next_cursor")) {
//
//                jsonNext = outerObject.get("next_cursor").toString();
//
//                ifWeHaveMoreResources = true;
//
//            } else {
//
//                ifWeHaveMoreResources = false;
//
//            }
//
//            JSONArray jsonArray = outerObject.getJSONArray("resources");
//            
//            //System.out.println(jsonArray);
//            
//            for (int i = 0, size = jsonArray.length(); i < size; i++) {
//
//                JSONObject objectInArray = jsonArray.getJSONObject(i);
//
//                String public_id = objectInArray.get("public_id").toString();
//
//                String url = objectInArray.get("secure_url").toString();
//                if(url.contains("resident")) 
//                    listRes.add(url);
//
//            }
//            
//            System.out.println(Arrays.asList(listRes));
//
//        }
//    }
