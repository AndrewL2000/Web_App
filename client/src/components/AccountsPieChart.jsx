import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetAccountsQuery } from "state/api";

const AccountsPieChart = ({ isDashboard = false }) => {
    const { data, isLoading } = useGetAccountsQuery({
        sort: "[]",
        search: "",
    });
    const theme = useTheme();

    if (!data || isLoading) return "Loading...";

    let colors = [];
    let bankCount = 1;
    let exchangeCount = 1;
    let totalAccountValue = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Bank") {
            colors = [...colors, theme.palette.blue[bankCount * 100]];
            bankCount++;
        } else {
            colors = [...colors, theme.palette.graphs[exchangeCount * 100]];
            exchangeCount++;
        }
        totalAccountValue += Number(data[i].currentValue);
    }

    const formattedData = Object.entries(data).map(
        ([_key, { account, currentValue }], i) => ({
            id: account,
            label: account,
            value: currentValue,
            color: colors[i],
        })
    );

    const legendProps = {
        anchor: "bottom",
        translateY: 50,
        direction: "row",
        itemWidth: 100,
        itemHeight: 18,
        itemsSpacing: 40,
        itemOpacity: 0.8,
        symbolShape: "circle",
    };

    return (
        <Box
            height={isDashboard ? "400px" : "1000px"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                colors={{ datum: "data.color" }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.45}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                legends={
                    formattedData && formattedData.length <= 6
                        ? [
                              {
                                  ...legendProps,
                                  translateY: 25,
                                  symbolSize: 18,
                                  itemsSpacing: 60,
                              },
                          ]
                        : [
                              {
                                  ...legendProps,
                                  symbolSize: 10,
                                  itemsSpacing: 5,
                                  translateY: 40,
                                  data: formattedData
                                      .slice(
                                          0,
                                          5
                                      )
                                      .map((cur, index) => ({
                                          id: cur.id,
                                          label: cur.id,
                                          color: cur.color,
                                      })),
                              },
                              {
                                  ...legendProps,
                                  symbolSize: 10,
                                  itemsSpacing: 5,
                                  translateY: 60,
                                  data: formattedData
                                      .slice(
                                          5,10
                                      )
                                      .map((cur, index) => ({
                                          id: cur.id,
                                          label: cur.id,
                                          color: cur.color,
                                      })),
                              },
                              {
                                ...legendProps,
                                symbolSize: 10,
                                itemsSpacing: 5,
                                translateY: 80,
                                data: formattedData
                                    .slice(
                                        10,15
                                    )
                                    .map((cur, index) => ({
                                        id: cur.id,
                                        label: cur.id,
                                        color: cur.color,
                                    })),
                            },
                          ]
                }
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard
                        ? "translate(-75%, -170%)"
                        : "translate(-50%, -100%)",
                }}
            >
                <Typography variant="h6">
                    {!isDashboard && "Total:"} ${totalAccountValue}
                </Typography>
            </Box>
        </Box>
    );
};

export default AccountsPieChart;
