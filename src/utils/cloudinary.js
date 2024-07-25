import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_KEY, 
      api_secret: process.env.CLOUDINARY_SECRET,
  });

const uploadOnCLoudinary = async(localPath) => {
      try{
            if(!localPath) return null

            const response = await cloudinary.uploader.upload(localPath, {
                  resource_type:"auto"
            })

            console.log("file is uploaded cloudinary",response.url);
            return response
      }catch(error){
            fs.unlinkSync(localPath);

            return null
      }
}

const uploadResult = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', { public_id: 'shoes', })
.catch((error) => {
    console.log(error);
});

export default cloudinary;