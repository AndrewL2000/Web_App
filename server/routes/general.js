import express from "express";
import {
    getUser,
    getToDoList,
    addToDoList,
    deleteToDoList,
    updateToDoList,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);

router.get("/todolist", getToDoList);
router.post("/todolist/:id", addToDoList);
router.delete("/todolist/:id", deleteToDoList);
router.put("/todolist/:id", updateToDoList);

export default router;
