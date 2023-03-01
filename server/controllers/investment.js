import ASX_Transactions from "../models/ASX_Transactions.js";
import Accounts from "../models/Accounts.js";
import User from "../models/User.js";
import { Op } from "sequelize";

export const getASXTransactions = async (req, res) => {
    try {
        // Frontend sending {"field": "id", "sort": "desc"} as a string
        const { page = 0, pageSize = 20, sort = "[]", search = "" } = req.query;

        // formatted sort should look like [["userId", "desc"]]
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            let sortFormatted = [];

            if (!(sortParsed.length == 0)) {
                sortFormatted = [
                    [
                        sortParsed.field,
                        sortParsed.sort === "asc" ? "ASC" : "DESC",
                    ],
                ];
            }

            return sortFormatted;
        };

        const sortFormatted = generateSort();
        console.log(sortFormatted);

        const offset = page * pageSize;

        const transactionsDB = await ASX_Transactions.findAll({
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${search}%` } },
                    { symbol: { [Op.like]: `%${search}%` } },
                ],
            },
            order: sortFormatted,
            offset: offset,
            limit: Number(pageSize),
        });

        // Convert transactionDB MYSQL syntax into Array of objects
        const transactions = transactionsDB.map((transaction) => {
            return {
                id: transaction.dataValues.id,
                dateBought: transaction.dataValues.dateBought,
                dateSold: transaction.dataValues.dateSold,
                symbol: transaction.dataValues.symbol,
                priceBought: transaction.dataValues.priceBought,
                priceSold: transaction.dataValues.priceSold,
                netPrice: transaction.dataValues.netPrice,
            };
        });

        //console.log("transactions", transactions);

        const total = await ASX_Transactions.count({
            where: {
                [Op.or]: [
                    { priceBought: { [Op.like]: `%${search}%` } },
                    { id: { [Op.like]: `%${search}%` } },
                ],
            },
        });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAccounts = async (req, res) => {
    try {
        const { sort = "[]", search = "" } = req.query;

        // formatted sort should look like [["userId", "desc"]]
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            let sortFormatted = [];

            if (!(sortParsed.length == 0)) {
                sortFormatted = [
                    [
                        sortParsed.field,
                        sortParsed.sort === "asc" ? "ASC" : "DESC",
                    ],
                ];
            }
            return sortFormatted;
        };

        const sortFormatted = generateSort();

        const allAccounts = await Accounts.findAll({
            where: {
                [Op.or]: [{ account: { [Op.like]: `%${search}%` } }],
                [Op.or]: [{ type: { [Op.like]: `%${search}%` } }],
            },
            order: sortFormatted,
        });
        res.status(200).json(allAccounts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addAccounts = async (req, res) => {
    const newAccount = new Accounts(req.body);
    console.log(newAccount);
    try {
        const savedAccount = await newAccount.save();
        console.log(savedAccount);
        res.status(200).json(savedAccount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteAccounts = async (req, res) => {
    try {
        console.log(req.params.id);
        const deletedAccount = await Accounts.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json(deletedAccount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateAccounts = async (req, res) => {
    try {
        await Accounts.update(req.body, {
            where: { id: req.params.id },
        });
        console.log(req.body);
        res.status(204);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
