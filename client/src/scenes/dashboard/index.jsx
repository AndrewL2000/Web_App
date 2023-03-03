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
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                />
            </FlexBetween>

            <Box position="absolute" right="20px" mt="20px" width="20%">
                <ToDoList />
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
