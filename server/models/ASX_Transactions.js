import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Database Connection
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
    }
);

const ASX_Transactions = sequelize.define(
    "ASX_Transactions",
    {
        dateBought: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dateSold: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priceBought: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        priceSold: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        netPrice: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        hooks: {
            afterBulkCreate: (transactions, options) => {
                transactions.forEach(async (transaction) => {
                    if (transaction.priceBought && transaction.priceSold) {
                        transaction.netPrice =
                            transaction.priceSold - transaction.priceBought + 1;
                    }
                });
            },
            // afterUpdate: (transactions, options) => {
            //     transactions.forEach((transaction) => {
            //         if (transaction.priceBought && transaction.priceSold) {
            //             transaction.netPrice =
            //                 transaction.priceSold - transaction.priceBought;
            //         }
            //     });
            // },
        },
    }
);

export default ASX_Transactions;
