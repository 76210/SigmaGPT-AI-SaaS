router.patch("/pin/:threadId", async (req, res) => {
    try {
        const thread = await Thread.findOne({
            threadId: req.params.threadId
        });

        thread.isPinned = !thread.isPinned;

        await thread.save();

        res.json(thread);
    } catch (err) {
        res.status(500).json(err);
    }
});
