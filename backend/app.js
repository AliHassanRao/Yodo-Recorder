import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import mergeRoutes from "./routes/mergeRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  console.error("Error: MONGODB_URL is not defined in environment variables.");
  process.exit(1);
}

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
}
await connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/merge", mergeRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voice Recorder App</h1>');
});

export default app;
