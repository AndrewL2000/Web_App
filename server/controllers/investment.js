import ASX_Transactions from "../models/ASX_Transactions.js";
import Accounts from "../models/Accounts.js";
import User from "../models/User.js";
import { Op } from "sequelize";
import { Spot } from "@binance/connector";

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

const client = new Spot(process.env.BINANCE_API, process.env.BINANCE_SECRET, {
    timeout: 1000,
});

const getTickerPrice = async (ticker) => {
    try {
        let tickerPrice;
        if (ticker === "USDT") {
            tickerPrice = 1;
            return tickerPrice;
        }
        const response = await client.tickerPrice(`${ticker}USDT`);
        tickerPrice = response.data.price;
        return tickerPrice;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }
};

export const getBinanceMarginAccount = async (req, res) => {
    try {
        let btcPrice;
        client.tickerPrice("BTCUSDT").then((response) => {
            btcPrice = response.data.price;
        });

        const { data: marginAccount } = await client.marginAccount();

        const marginAssets = await Promise.all(
            marginAccount.userAssets
                .filter((asset) => asset.netAsset !== "0")
                .map(async (asset) => {
                    const tickerPrice = Number(
                        await getTickerPrice(asset.asset)
                    );
                    return {
                        ...asset,
                        freeUSDT: Number(asset.free) * tickerPrice,
                        netAssetUSDT: Number(asset.netAsset) * tickerPrice,
                    };
                })
        );

        console.log(marginAccount);
        const marginAccountInfo = {
            marginLevel: Number(marginAccount.marginLevel),
            marginAccountValueUSDT: Number(marginAccount.totalAssetOfBtc) * Number(btcPrice),
            marginLiabilityUSDT: Number(marginAccount.totalLiabilityOfBtc) * Number(btcPrice),
            marginNetAccountValueUSDT: Number(marginAccount.totalNetAssetOfBtc) * Number(btcPrice),
            marginAssets: await Promise.all(marginAssets), // Resolves multiple promises concurrently
        };

        // client
        //     .marginMyTrades("AGIXUSDT")
        //     .then((response) => client.logger.log(response.data))
        //     .catch((error) => client.logger.error(error));

        res.status(200).json(marginAccountInfo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getBinanceMarginClosedTrades = async (req, res) => {};

export const getBinanceMarginOpenTrades = async (req, res) => {};
