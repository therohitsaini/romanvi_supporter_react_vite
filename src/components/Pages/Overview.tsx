import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hook/hook";
import { fetchAdminUsers, fetchAllUserConversions } from "../../reduxToolKit/slice/adminSlice";
import LineChartOur from "../charts/LineChartOur";
import api from "../../config/api";



export default function OverviewCards() {
    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string | null>(null);
    const users = useSelector((state) => state?.admin?.user);
    const conversions = useSelector((state) => state?.admin?.conversions);
    const [analytics, setAnalytics] = useState<any>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("_user_Identy_v3");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(fetchAdminUsers(userId));
            dispatch(fetchAllUserConversions(userId));
        }
    }, [userId, dispatch]);

    const fetchAnalytics = async () => {
        try {
            const response = await api.get(`/api/patner/admin/partner/analytics/dashboard/${userId}`);
            console.log("Analytics data:", response.data.analytics);
            if (response.status === 200) {
                setAnalytics(response.data);
                console.log("Analytics state updated:", response.data.data);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    }
    useEffect(() => {
        if (userId) {
            fetchAnalytics();
        }
    }, [userId, dispatch]);


    const stats = [
        {
            title: "Users",
            value: users.data?.length ? users.data.length.toString() : "0",
            change: "+25%",
            positive: true,
            subtitle: "Last 30 days",
        },
        {
            title: "Conversions",
            value: conversions.totalChats ? conversions.totalChats.toString() : "0",
            change: "-25%",
            positive: false,
            subtitle: "Last 30 days",
        },
        {
            title: "Event count",
            value: "200",
            change: "+5%",
            positive: true,
            subtitle: "Last 30 days",
        },
    ];

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
                {stats.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            bgcolor: " rgba(20, 23, 26, 0.6)",
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
                                <Typography variant="h4">{item.value + "K"}</Typography>

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

                        <Typography gutterBottom>
                            Explore your data
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7, mb: 3 }}
                        >
                            Uncover performance and visitor insights with our data wizardry.
                        </Typography>


                    </CardContent>
                </Card>
            </Box>
            <div className="mt-6">
                <LineChartOur analytics={analytics} />
            </div>
        </Box>
    );
}
