const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const recordingRoutes = require('./routes/recordingRoutes');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api', recordingRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to  Voice Recorder App</h1>');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
