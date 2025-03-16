import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/FinancialRecords";
import cors from "cors";

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// ✅ Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173", // Adjust based on your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(express.json());

// ✅ Ensure MongoDB URI is defined
const mongoURI: string | undefined = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

// ✅ Use Financial Records Router
app.use("/financial-records", financialRecordRouter);

// ✅ Default Route (Check if Backend is Running)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

