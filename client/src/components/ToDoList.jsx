import React from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
function TodoList(props) {
    const { todos, onToggle, onDelete } = props;

    return (
        <List>
            {todos.map((todo) => (
                <ListItem key={todo.id} dense button>
                    <Checkbox
                        checked={todo.completed}
                        onClick={() => onToggle(todo)}
                    />
                    <ListItemText
                        primary={todo.text}
                        style={{
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    />
                    <DeleteOutlineOutlined onClick={() => onDelete(todo)} />
                </ListItem>
            ))}
        </List>
    );
}

export default TodoList;
