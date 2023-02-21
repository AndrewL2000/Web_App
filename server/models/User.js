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

const User = sequelize.define(
    "User",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 50],
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 255],
            },
        },
        transactions: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue("transactions"));
            },
            set(value) {
                this.setDataValue("transactions", JSON.stringify(value));
            },
        },
        role: {
            type: DataTypes.ENUM("user", "admin", "superadmin"),
            defaultValue: "admin",
        },
    },
    {
        timestamps: true,
    }
);

export default User;
