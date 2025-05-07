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
    transformation: [
      { width: 300, crop: 'limit' },
      { fetch_format: 'webp' },   // تأكد من تحويل الصورة إلى WebP عند الطلب
      { quality: 'auto' },         // ضبط الجودة تلقائيًا
    ],
    format: 'webp',               // اجعل Cloudinary يحفظ الصور بتنسيق WebP
  },
});

export { cloudinary, storage };
