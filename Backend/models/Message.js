import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  threadId: String,
  text: String,
  sender: {
    type: String,
    enum: ["user", "ai"],
  },

  isPinned: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);