import express from "express";
import {
    getASXTransactions
} from '../controllers/investment.js'


const router = express.Router();

router.get("/asx", getASXTransactions);

export default router;