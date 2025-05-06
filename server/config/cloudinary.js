import { v2 as cloudinary } from 'cloudinary';
import  { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.CLOUDNARY_NAME);

 cloudinary.config({
        cloud_name: process.env.CLOUDNARY_NAME,
        api_key: process.env.CLOUDNARY_APIKEY,
        api_secret: process.env.CLOUDNARY_SECRETKEY
    });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'doctors',
    allowed_formats: ['jpg', 'png','jpeg'],
    transformation: [{ width: 300, height: 300, crop: 'limit' }],
  },
});

export  { cloudinary, storage };
