import express from "express";
import Thread from "../models/Thread.js";
//import getOpenAIAPIResponse from "../utils/openai.js";
import getOpenAIAPIResponse, {
    generateTitle
} from "../utils/openai.js"; 
/// 
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// TEST
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing Thread"
        });

        const response = await thread.save();
        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in DB" });
    }
});


// GET ALL THREADS
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});


// GET SINGLE THREAD
router.get("/thread/:threadId", async (req, res) => {
    try {
        const thread = await Thread.findOne({ threadId: req.params.threadId });

        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }

        res.json(thread.messages);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});


// DELETE THREAD
router.delete("/thread/:threadId", async (req, res) => {
    try {
        const deletedThread = await Thread.findOneAndDelete({
            threadId: req.params.threadId
        });

        if (!deletedThread) {
            return res.status(404).json({ error: "Thread not found" });
        }

        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});
 
//pined logic 
// PIN / UNPIN THREAD
router.patch("/thread/pin/:threadId", async (req, res) => {
    try {

        const thread = await Thread.findOne({
            threadId: req.params.threadId
        });

        if (!thread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        thread.isPinned = !thread.isPinned;

        await thread.save();

        res.json({
            success: true,
            isPinned: thread.isPinned
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to pin thread"
        });
    }
});
///
router.post("/chat", async (req, res) => {
    try {
        let { threadId, message, fileUrl } = req.body;

        if (!message) {
            return res.status(400).json({ error: "message required" });
        }

        if (!threadId) {
            threadId = uuidv4();
        }

        let thread = await Thread.findOne({ threadId });

        // if (!thread) {
        //     thread = new Thread({
        //         threadId,
        //         title: message,
        //         messages: []
        //     });
        // } 
       if (!thread) {

    const generatedTitle =
        await generateTitle(message);

    thread = new Thread({
        threadId,
        title: generatedTitle,
        messages: []
    });
}

        // USER MESSAGE (UPDATED WITH FILE SUPPORT)
        thread.messages.push({
            role: "user",
            content: message,
            fileUrl: fileUrl || null   // 🔥 ADD THIS
        });
         
        console.log("MESSAGE =", message);
        console.log("FILE URL =", fileUrl);  
      
        const assistantReply = await getOpenAIAPIResponse(
    message,
    fileUrl
  );   
        thread.messages.push({
            role: "assistant",
            content: assistantReply
        });

        thread.updatedAt = new Date();
        await thread.save();

        res.json({
            threadId,
            reply: assistantReply
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" });
    }
});

export default router;