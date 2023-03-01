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

const ToDoList = sequelize.define(
    "ToDoList",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
    },
    {
        timestamps: true,
        hooks: {},
    }
);

export default ToDoList;
