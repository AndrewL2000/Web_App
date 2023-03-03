import React from "react";
import { Box, useTheme } from "@mui/material";
import StatBox from "components/StatBox";
import { CurrencyBitcoinOutlined } from "@mui/icons-material";

import { useGetBinanceQuery, useMutateBinanceMutation } from "state/api";

const Binance = () => {
    const theme = useTheme();

    const { data: marginAccount, isLoading: marginLoading } =
        useGetBinanceQuery({
            endpoint: "margin",
        });
    if (!marginAccount || marginLoading) return "Loading...";
    console.log(marginAccount);

    return (
        <Box m="1.5rem 2.5rem">
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: "span 12" },
                }}
            >
                <StatBox
                    title="Margin Account Value (USDT)"
                    value={marginAccount.marginAccountValueUSDT}
                    increase="{Placeholder for %Change}"
                    description="Since last month"
                    icon={
                        <CurrencyBitcoinOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
                <StatBox
                    title="Margin Liability (USDT)"
                    value={marginAccount.marginLiabilityUSDT}
                    increase="{Placeholder for %Change}"
                    description="Since last month"
                    icon={
                        <CurrencyBitcoinOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
                <StatBox
                    title="Margin Net Account Value (USDT)"
                    value={marginAccount.marginNetAccountValueUSDT}
                    increase="{Placeholder for %Change}"
                    description="Since last month"
                    icon={
                        <CurrencyBitcoinOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
                <StatBox
                    title="Margin Level"
                    value={marginAccount.marginLevel}
                    increase="{1.1 is Liquidation}"
                    description="Since last month"
                    icon={
                        <CurrencyBitcoinOutlined
                            sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "26px",
                            }}
                        />
                    }
                />
            </Box>
        </Box>
    );
};

export default Binance;
