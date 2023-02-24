import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import investmentRoutes from "./routes/investment.js";
import generalRoutes from "./routes/general.js";
//import managementRoutes from "./routes/management.js";
import budgetRoutes from "./routes/budget.js";

// Data
import AccountsJSON from "./data/Accounts.json" assert { type: "json" };
import Monthly_IncomeJSON from "./data/Monthly_Income.json" assert { type: "json" };
import Monthly_SpendingJSON from "./data/Monthly_Spending.json" assert { type: "json" };
import UsersJSON from "./data/Users.json" assert { type: "json" };
import ASX_TransactionsJSON from "./data/ASX_Transactions.json" assert { type: "json" };

// Data Model Imports
import User from "./models/User.js";
import Monthly_Income from "./models/Monthly_Income.js";
import Monthly_Spending from "./models/Monthly_Spending.js";
import ASX_Transactions from "./models/ASX_Transactions.js";
import Accounts from "./models/Accounts.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
// Middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allows cross-origin requests (Need to make API calls from another server)
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/investment", investmentRoutes);
app.use("/general", generalRoutes);
// app.use("/management", managementRoutes);
app.use("/budget", budgetRoutes);

/* MySQL SETUP */
const PORT = process.env.PORT || 9000;

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

// Database Authentication
sequelize
    .authenticate()
    .then(async () => {
        console.log("Connection has been established successfully");
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

        // Create the table if it doesn't exist
        await Monthly_Income.sync();
        await Monthly_Spending.sync();
        await Accounts.sync();
        await User.sync();
        await ASX_Transactions.sync();

        ASX_Transactions.destroy({ truncate: true });
        ASX_Transactions.bulkCreate(ASX_TransactionsJSON);
        
        // User.destroy({ truncate: true });
        // User.bulkCreate(UsersJSON);
        // Monthly_Spending.destroy({ truncate: true });
        // Monthly_Spending.bulkCreate(Monthly_SpendingJSON);
        // Monthly_Spending.update(
        //     {
        //         month: sequelize.fn("month", sequelize.col("date")),
        //         year: sequelize.fn("year", sequelize.col("date")),
        //     },
        //     {
        //         where: {},
        //     }
        // );
        // Monthly_Income.destroy({ truncate: true });
        // Monthly_Income.bulkCreate(Monthly_IncomeJSON);
        // Accounts.bulkCreate(AccountsJSON);
    })
    .catch((err) => {
        console.error("Did not connect to the database:", err);
    });
