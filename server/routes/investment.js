import express from "express";
import {
    getASXTransactions,
    getAccounts,
    addAccounts,
    deleteAccounts,
    updateAccounts,
    getBinanceMarginAccount,
} from "../controllers/investment.js";

const router = express.Router();

router.get("/asx", getASXTransactions);

router.get("/accounts", getAccounts);
router.post("/accounts/:id", addAccounts);
router.delete("/accounts/:id", deleteAccounts);
router.put("/accounts/:id", updateAccounts);

router.get("/binance/margin", getBinanceMarginAccount);

export default router;
