import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import moment from "moment";

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

const Monthly_Spending = sequelize.define(
    "Monthly_Spending",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            unique: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        incoming: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        outgoing: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        net: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        timestamps: true,
            
    }
);


export default Monthly_Spending;
