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

const Accounts = sequelize.define(
    "Accounts",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentValue: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        initialInvestment: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        PL: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        hooks: {
            // afterBulkUpdate: async (accounts, options) => {
            //     // console.log(accounts.attributes)
            //     const id = accounts.where.id
            //     const currentValue = accounts.attributes.currentValue;
            //     const initialInvestment = accounts.attributes.initialInvestment;
            //     const data = {
            //         PL: currentValue - initialInvestment,
            //     };
            //     await Accounts.update(data, { where: { id: id } }, { hooks: false });
            // },
        },
    }
);

export default Accounts;
