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

const Monthly_Income = sequelize.define(
    "Monthly_Income",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        income: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default Monthly_Income;
