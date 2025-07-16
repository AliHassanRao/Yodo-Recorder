import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import mergeRoutes from "./routes/mergeRoutes.js";
import connectToDatabase from "./utils/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));




 connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/merge", mergeRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voice Recorder App</h1>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
