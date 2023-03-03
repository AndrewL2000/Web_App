import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    CurrencyBitcoinOutlined,
    ReceiptLongOutlined,
    RocketLaunchOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    AccountBalanceWalletOutlined,
    AccountBalanceOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/LuzerkerLogo.PNG";

const navItems = [
    {
        text: "Dashboard",
        url: "dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Investments",
        url: "investments",
        icon: null,
    },
    {
        text: "Accounts",
        url: "accounts",
        icon: <AccountBalanceWalletOutlined />,
    },
    {
        text: "ASX",
        url: "asx",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Bank",
        url: "bank",
        icon: <AccountBalanceOutlined />,
    },
    {
        text: "Binance",
        url: "binance",
        icon: <CurrencyBitcoinOutlined />,
    },

    {
        text: "CoinSpot",
        url: "coinspot",
        icon: <RocketLaunchOutlined />,
    },
    {
        text: "Budget",
        url: "budget",
        icon: null,
    },
    {
        text: "Overview",
        url: "overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        url: "daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        url: "monthly-spending",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        url: "breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        url: "management",
        icon: null,
    },
    {
        text: "Admin",
        url: "admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        url: "performance",
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState(""); // Keeps track of URL
    const navigate = useNavigate(); // Navigate other pages
    const theme = useTheme(); // Picks page colours

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        LUZERKER
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, url, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "2.25rem 0 1rem 3rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = url.toLowerCase(); // URL

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`); // Navigate to the page
                                                setActive(lcText); // Set the page to highlight the page in Sidebar
                                            }}
                                            // Change color of text depending whether page is active
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette
                                                              .secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette
                                                              .primary[600]
                                                        : theme.palette
                                                              .secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .primary[600]
                                                            : theme.palette
                                                                  .secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined
                                                    sx={{ ml: "auto" }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
