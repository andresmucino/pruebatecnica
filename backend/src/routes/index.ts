import express from "express";
import {
    CreateTransactions,
    DeleteOneTransaction,
    GetTransactionById,
    GetTransactions,
    UpdateOneTransaction,
} from "../controllers/Transactions.controller";
import { DownloadReport } from "../controllers/Reports.controller";

const router = express.Router();

router.get("/", GetTransactions);
router.get("/downloadreport", DownloadReport);
router.get("/:id", GetTransactionById);
router.post("/", CreateTransactions);
router.put("/:id", UpdateOneTransaction)
router.delete('/:id', DeleteOneTransaction);

export default router;
