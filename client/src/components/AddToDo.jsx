import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function AddTodo(props) {
    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAdd({ text });
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "center" }}>
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
    );
}

export default AddTodo;
