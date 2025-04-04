import multer from "multer";
import crypto from "crypto";
import "dotenv";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (req, file) => {
      const fileHash = crypto.randomBytes(8).toString("hex");
      return `${fileHash}-${file.originalname}`;
    },
  },
});

export const upload = multer({ storage });
