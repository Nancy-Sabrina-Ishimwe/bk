// helper/cloud.ts
import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

// Upload a file buffer to Cloudinary
export const uploadToCloud = (file: Express.Multer.File): Promise<CloudinaryResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      { folder: "gb_group_kingdom" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryResult);
      }
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export default cloudinaryV2;