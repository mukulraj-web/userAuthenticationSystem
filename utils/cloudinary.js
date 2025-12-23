import {v2 as cloudinary} from "cloudinary";

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

        return response;
    } catch(err){
        res.status(404).send("Error while uploading  the cover image!!", err);
        console.log("errorrr", err);
    }
}

export default uploadOnCloudinary