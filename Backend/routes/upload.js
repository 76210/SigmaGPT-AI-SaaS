import express from "express";
import multer from "multer";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/chat_files",
    });

    console.log("UPLOAD SUCCESS:", result.url);
    res.json({ url: result.url });

  } catch (err) {
    console.log("UPLOAD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;