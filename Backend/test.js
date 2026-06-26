import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
  const result = await cloudinary.uploader.upload("./config/test-image.jpg", {
    folder: "chat_files",
    resource_type: "image",
  });
  console.log("SUCCESS:", result.secure_url);
} catch (err) {
  console.log("ERROR:", err.message || err);
}