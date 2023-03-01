import express from "express";
import {
    getASXTransactions,
    getAccounts,
    addAccounts,
    deleteAccounts,
    updateAccounts,
} from "../controllers/investment.js";

const router = express.Router();

router.get("/asx", getASXTransactions);
router.get("/accounts", getAccounts);
router.post("/accounts/:id", addAccounts);
router.delete("/accounts/:id", deleteAccounts);
router.put("/accounts/:id", updateAccounts);

export default router;
