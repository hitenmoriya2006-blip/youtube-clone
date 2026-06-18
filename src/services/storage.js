import {v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
import { ApiError } from '../utils/ApiError.js';
dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


async function uploadOnCloudinary (localFilePath){

  try {

    if(!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:'auto'
    })
    console.log('upoaded onn cloudinary',response.url)
     fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }

}

async function deleteFromCloudinary(publicId) {
    if (!publicId) return null;

    try {
        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result !== "ok") {
            throw new Error(`Cloudinary deletion failed: ${response.result}`);
        }

        return response;
    } catch (error) {
        console.error("Cloudinary delete error:", error.message);
        throw error;
    }
}


export {uploadOnCloudinary  ,deleteFromCloudinary}

