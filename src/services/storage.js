import {v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


async function uploadOnCloudinary (localFilePath){

  try {
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type:'auto'
    })
    console.log('upoaded onn cloudinary',response.url)
    return response
  } catch (error) {
    fs.linkSync(localFilePath)
    return null
  }

}

export {uploadOnCloudinary}

