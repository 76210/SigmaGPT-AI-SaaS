import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/authRoutes.js";// 
import uploadRoutes from "./routes/upload.js";
import messageRoutes from "./routes/messageRoutes.js";
//
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
//
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
///
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); 
///

app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads")); 
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);//
app.use("/api/messages", messageRoutes); 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Db", err);
    }
};

connectDB();

// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
// }); 

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

export default app;
