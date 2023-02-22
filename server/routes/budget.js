import express from "express";
import {
    getMonthlySpending
} from '../controllers/budget.js';


const router = express.Router();

router.get("/monthly-spending", getMonthlySpending);

export default router;