import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import ASXTransactions from "scenes/asxTransactions";
import MonthlySpending from "scenes/monthlySpending";
import Line from "scenes/line";
import Accounts from "scenes/accounts";
import Binance from "scenes/binance";
import CoinSpot from "scenes/coinspot";
import Bank from "scenes/bank";

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>    
                            <Route path='/' element={<Navigate to='/dashboard' replace />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/asx" element={<ASXTransactions />} />
                            <Route path="/monthly-spending" element={<Line />} />
                            <Route path="/accounts" element={<Accounts />} />
                            <Route path="/binance" element={<Binance />} />
                            <Route path="/coinspot" element={< CoinSpot/>} />
                            <Route path="/bank" element={< Bank/>} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
