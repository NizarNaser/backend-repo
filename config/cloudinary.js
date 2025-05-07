// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'restaurant-images',
    allowed_formats: ['webp'], // احفظ فقط بصيغة WebP
    transformation: [
      { width: 300, crop: 'limit' },
      { fetch_format: 'webp' },   // f_webp بدلاً من auto
      { quality: 'auto' },        // ضغط تلقائي
    ],
    format: 'webp' // يجبر Cloudinary على حفظ الصورة بتنسيق webp
  }
});

export { cloudinary, storage };
