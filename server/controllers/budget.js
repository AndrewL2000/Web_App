import Monthly_Spending from "../models/Monthly_Spending.js";
import User from "../models/User.js";
import { Op } from "sequelize";

export const getMonthlySpending = async (req, res) => {
    try {
        const allMonthlySpending = await Monthly_Spending.findAll();
        res.status(200).json(allMonthlySpending);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
