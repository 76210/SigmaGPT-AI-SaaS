import express from "express";
import { pinMessage, unpinMessage } from "../controllers/messageController.js";
import Message from "../models/Message.js";

const router = express.Router();

// GET ALL MESSAGES
router.get("/", async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

// PIN
router.put("/pin/:id", pinMessage);

// UNPIN
router.put("/unpin/:id", unpinMessage);

export default router;