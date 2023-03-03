import React, { useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Container,
    TextField,
    Button,
    useTheme,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useMutateToDoListMutation, useGetToDoListQuery } from "state/api";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./StrictModeDroppable"; // Allows Droppable to be used in StrictMode

const ToDoList = (props) => {
    //const { todos, onToggle, onDelete } = props;
    const theme = useTheme();
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);

    const { data, isLoading } = useGetToDoListQuery();

    const [todos, setTodos] = useState([]);
    // Make sure there is data before assigning
    useEffect(() => {
        data && setTodos(data);
    }, [data]);

    const [toDoListMutate, ...rest] = useMutateToDoListMutation();

    const handleAddTodo = (newTodo) => {
        const id = uuidv4();
        const formattedToDo = { id: id, text: newTodo.text, completed: false };
        setTodos([...todos, formattedToDo]);
        toDoListMutate({
            id: id,
            data: formattedToDo,
            method: "POST",
        });
    };

    const handleEditTodo = (editedTodo) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === editedTodo.id
                ? { ...todo, text: editedTodo.text }
                : todo
        );
        setTodos(updatedTodos);
        toDoListMutate({
            id: editedTodo.id,
            data: editedTodo,
            method: "PUT",
        });
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddTodo({ text });
        setText("");
    };

    const handleToggleTodo = (todoToToggle) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoToToggle.id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        let updatedToDo = { ...todoToToggle, isNew: false };
        updatedToDo.completed = !updatedToDo.completed;
        setTodos(updatedTodos);
        toDoListMutate({
            id: updatedToDo.id,
            data: updatedToDo,
            method: "PUT",
        });
    };

    const handleDeleteTodo = (todoToDelete) => {
        setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
        toDoListMutate({
            id: todoToDelete.id,
            data: "",
            method: "DELETE",
        });
    };

    const handleDoubleClick = (todoToEdit) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoToEdit.id) {
                return { ...todo, isEditing: true };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleEditInputChange = (event, todoToEdit) => {
        const updatedTodo = { ...todoToEdit, text: event.target.value };
        setTodos(
            todos.map((todo) =>
                todo.id === todoToEdit.id ? updatedTodo : todo
            )
        );
    };

    const handleEditSubmit = (todoToEdit) => {
        handleEditTodo(todoToEdit);
        const updatedTodos = todos.map((todo) =>
            todo.id === todoToEdit.id ? { ...todo, isEditing: false } : todo
        );
        setTodos(updatedTodos);
    };

    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index,
        }));

        setTodos(updatedItems);
    };

    return !isLoading ? (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    <TextField
                        label="Add Todo"
                        value={text}
                        onChange={handleTextChange}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                </div>
            </form>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <StrictModeDroppable droppableId="todos">
                    {(provided) => (
                        <List
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todos.map((todo, index) => (
                                <Draggable
                                    key={todo.id}
                                    draggableId={todo.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            key={todo.id}
                                            dense
                                            button
                                        >
                                            <Checkbox
                                                checked={todo.completed}
                                                onClick={() =>
                                                    handleToggleTodo(todo)
                                                }
                                            />
                                            {todo.isEditing ? (
                                                <TextField
                                                    value={todo.text}
                                                    onChange={(event) =>
                                                        handleEditInputChange(
                                                            event,
                                                            todo
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        handleEditSubmit(todo)
                                                    }
                                                    autoFocus
                                                />
                                            ) : (
                                                <ListItemText
                                                    primary={todo.text}
                                                    style={{
                                                        textDecoration:
                                                            todo.completed
                                                                ? "line-through"
                                                                : "none",
                                                    }}
                                                    onDoubleClick={() =>
                                                        handleDoubleClick(todo)
                                                    }
                                                />
                                            )}
                                            <DeleteOutlineOutlined
                                                onClick={() =>
                                                    handleDeleteTodo(todo)
                                                }
                                            />
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </Container>
    ) : (
        "Loading..."
    );
};

export default ToDoList;
