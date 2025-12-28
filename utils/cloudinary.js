import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        const response =  await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        fs.unlinkSync(localFilePath);
        // console.log(response)
        return response;
    } catch(err){
        // res.status(404).send("Error while uploading  the cover image!!", err);
        // console.log("errorrr", err);

        fs.unlinkSync(localFilePath);
        // console.log("error while sending to cloudinary")
        return err;


    }
}

export default uploadOnCloudinary