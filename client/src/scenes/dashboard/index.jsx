import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
    DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccountsPieChart from "components/AccountsPieChart";

import ToDoList from "components/ToDoList";
import AddTodo from "components/AddToDo";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const [todos, setTodos] = useState([]);

    const handleAddTodo = (newTodo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), text: newTodo.text, completed: false },
        ]);
    };

    const handleToggleTodo = (todoToToggle) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoToToggle.id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (todoToDelete) => {
        const filteredTodos = todos.filter(
            (todo) => todo.id !== todoToDelete.id
        );
        setTodos(filteredTodos);
    };
    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                />
            </FlexBetween>

            <Box position="absolute" right="20px" mt="20px" width="20%">
                <Container maxWidth="sm">
                    <AddTodo onAdd={handleAddTodo} />
                    <ToDoList
                        todos={todos}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />
                </Container>
            </Box>

            {/* ROW 1 */}
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(11, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": {
                        gridColumn: isNonMediumScreens ? undefined : "span 12",
                    },
                }}
            >
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography
                        variant="h6"
                        sx={{ color: theme.palette.secondary[100] }}
                    >
                        Accounts Value
                    </Typography>
                    <AccountsPieChart isDashboard={true} />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
