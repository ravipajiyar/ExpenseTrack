import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/FinancialRecord";
import mongoose from "mongoose";

const router = express.Router();

// ✅ GET: Fetch All Financial Records
router.get("/getAllByUserID/:userId", async (req: Request, res: Response): Promise<void> => {
    try {
        const records = await FinancialRecordModel.find();
        res.status(200).json(records);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

// ✅ GET: Fetch a Single Financial Record by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid record ID." });
            return;
        }

        const record = await FinancialRecordModel.findById(id);

        if (!record) {
            res.status(404).json({ message: "Record not found." });
            return;
        }

        res.status(200).json(record);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

// ✅ POST: Create a New Financial Record
router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const newRecord = new FinancialRecordModel(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

// ✅ PUT: Update Financial Record by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const newRecordBody = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid record ID." });
            return;
        }

        const record = await FinancialRecordModel.findByIdAndUpdate(
            id, 
            newRecordBody, 
            { new: true, runValidators: true }
        );

        if (!record) {
            res.status(404).json({ message: "Record not found." });
            return;
        }

        res.status(200).json(record);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

// ✅ DELETE: Delete Financial Record by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid record ID." });
            return;
        }

        const record = await FinancialRecordModel.findByIdAndDelete(id);

        if (!record) {
            res.status(404).json({ message: "Record not found." });
            return;
        }

        res.status(200).json({ message: "Record deleted successfully.", record });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

export default router;
