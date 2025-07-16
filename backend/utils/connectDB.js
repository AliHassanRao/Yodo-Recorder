import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://alihassanrao:alihassanrao@bank.1hauq95.mongodb.net/yodotask';

if (!mongoUrl) {
  console.error("MongoDB connection error: Environment variable MONGODB_URL is not defined.");
  process.exit(1);
}

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

export default connectToDatabase;
