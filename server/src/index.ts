// username : pajiyargravi20011
//pwd: FU32Tx4U4aV782zZ

import express, {Express} from "express";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string = "mongodb+srv://pajiyargravi20011:FU32Tx4U4aV782zZ@personalfinancetracker.r9ipz.mongodb.net/";

mongoose
    .connect(mongoURI)
    .then(()=> console.log("Connected to MongoDB"))
    .catch((err)=> console.error("Failed to connect to MongoDB:", err))

app.listen(port,()=> {
    console.log(`server running on Port ${port}`)
})
