import dotenv from "dotenv";
import express, {Express} from "express"
import mongoose from "mongoose";
import financialRecordRouter from "./routes/FinancialRecords"

// Load environment variables *before* using them
dotenv.config();
const app : Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string | undefined = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1); // Exit process if no URI is found
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

app.use("/FinancialRecords", financialRecordRouter)

app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
})