import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import financialRecordRouter from "./routes/FinancialRecords";

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// ✅ Define allowed origins dynamically
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://expensetrack-frontend.onrender.com", // Production
];

// ✅ Configure CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`❌ CORS Error: Origin ${origin} not allowed`);
        callback(new Error("CORS policy error: Origin not allowed"));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies/auth headers
  })
);

// ✅ Handle Preflight Requests (OPTIONS method)
app.options("*", cors());

app.use(express.json());

// ✅ Ensure MongoDB URI is provided
const mongoURI: string | undefined = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// ✅ Connect to MongoDB with better error handling
mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 5000 }) // Prevents long hangs
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit on critical failure
  });

// ✅ Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📌 ${req.method} Request to ${req.url}`);
  next();
});

// ✅ Use Financial Records Router
app.use("/financial-records", financialRecordRouter);

// ✅ Default Route (Health Check)
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
