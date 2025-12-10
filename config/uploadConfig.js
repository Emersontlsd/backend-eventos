import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'event-platform',
    resource_type: 'image',
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

export default upload;
