const Thread = require("../models/Thread");

const pinThread = async (req, res) => {
    try {
        const { threadId } = req.params;

        const thread = await Thread.findOne({
            threadId
        });

        if (!thread) {
            return res.status(404).json({
                message: "Thread not found"
            });
        }

        thread.isPinned = !thread.isPinned;

        await thread.save();

        res.json(thread);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};