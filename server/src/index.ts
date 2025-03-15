
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables *before* using them
dotenv.config();

const mongoURI: string | undefined = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1); // Exit process if no URI is found
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

