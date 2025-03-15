import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/FinancialRecord";
import mongoose from "mongoose";

const router = express.Router();

// ✅ PUT: Update Financial Record
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

// ✅ DELETE: Delete Financial Record
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
