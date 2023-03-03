import User from "../models/User.js";
import ToDoList from "../models/ToDoList.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getToDoList = async (req, res) => {
    try {
        const toDoList = await ToDoList.findAll();
        res.status(200).json(toDoList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addToDoList = async (req, res) => {
    const newToDo = new ToDoList(req.body);
    try {
        const savedToDo = await newToDo.save();
        console.log(savedToDo);
        res.status(200).json(savedToDo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteToDoList = async (req, res) => {
    try {
        const deletedToDo = await ToDoList.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json(deletedToDo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateToDoList = async (req, res) => {
    try {
        await ToDoList.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(204);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
