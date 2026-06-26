import cloudinary from "../config/cloudinary.js";

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "SigmaGPT",
  });

  return result.secure_url;
};

export default uploadImage;