import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InsightsIcon from "@mui/icons-material/Insights";

const stats = [
    {
        title: "Users",
        value: "14k",
        change: "+25%",
        positive: true,
        subtitle: "Last 30 days",
    },
    {
        title: "Conversions",
        value: "325",
        change: "-25%",
        positive: false,
        subtitle: "Last 30 days",
    },
    {
        title: "Event count",
        value: "200k",
        change: "+5%",
        positive: true,
        subtitle: "Last 30 days",
    },
];

export default function OverviewCards() {
    return (
        <Box sx={{ p: 4, bgcolor: "#090909", minHeight: "100vh" }}>
            <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
                Overview
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 3,
                }}
            >
                {/* Stats Cards */}
                {stats.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            bgcolor: "#101011",
                            color: "#fff",
                            borderRadius: 3,
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "0.3s",
                            "&:hover": {
                                border: "1px solid rgba(255,255,255,0.2)",
                            },
                            padding: 0,
                            height: "180px"
                        }}
                    >
                        <CardContent>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                {item.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 1,
                                }}
                            >
                                <Typography variant="h4">{item.value}</Typography>

                                <Chip
                                    label={item.change}
                                    // icon={
                                    //     // item.positive ? (
                                    //     //     <TrendingUpIcon />
                                    //     // ) : (
                                    //     //     <TrendingDownIcon />
                                    //     // )
                                    // }
                                    sx={{
                                        bgcolor: item.positive
                                            ? "rgba(34,197,94,0.15)"
                                            : "rgba(239,68,68,0.15)",
                                        color: item.positive ? "#22C55E" : "#EF4444",
                                        fontWeight: 500,
                                    }}
                                />
                            </Box>

                            <Typography variant="caption" sx={{ opacity: 0.6 }}>
                                {item.subtitle}
                            </Typography>

                            {/* Fake Graph Line */}
                            {/* <Box
                                sx={{
                                    mt: 3,
                                    height: 40,
                                    background:
                                        "linear-gradient(180deg, rgba(34,197,94,0.3) 0%, transparent 100%)",
                                    borderRadius: 2,
                                }}
                            /> */}
                        </CardContent>
                    </Card>
                ))}

                {/* Explore Card */}
                <Card
                    sx={{
                        bgcolor: "#111827",
                        color: "#fff",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.08)",
                        height: "180px"

                    }}
                >
                    <CardContent>
                        <InsightsIcon sx={{ fontSize: 32, mb: 2, opacity: 0.8 }} />

                        <Typography  gutterBottom>
                            Explore your data
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7, mb: 3 }}
                        >
                            Uncover performance and visitor insights with our data wizardry.
                        </Typography>

                        {/* <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#fff",
                                color: "#000",
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    bgcolor: "#e5e7eb",
                                },
                            }}
                        >
                            Get insights
                        </Button> */}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
