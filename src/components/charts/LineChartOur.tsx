import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatData } from "../Helper/FormateDate";

// ✅ Chat widget SaaS data
const data = [
    { date: "Mon", chats: 120, users: 40 },
    { date: "Tue", chats: 200, users: 60 },
    { date: "Wed", chats: 150, users: 55 },
    { date: "Thu", chats: 300, users: 80 },
    { date: "Fri", chats: 250, users: 70 },
    { date: "Sat", chats: 400, users: 100 },
    { date: "Sun", chats: 350, users: 90 },
];

export default function LineChartOur(analytics: any) {
    const formattedData = formatData(analytics?.analytics?.data || []);

    console.log("LineChartOur received analytics:", formattedData);
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "700px",
                height: "300px",
                background: "#0c0c0c", // ✅ black bg
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #374151", // ✅ dark border
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                    {/* ✅ Grid (dark theme) */}
                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />

                    {/* ✅ X Axis */}
                    <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />

                    {/* ✅ Y Axis */}
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />

                    {/* ✅ Tooltip */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#9ca3af" }}
                    />

                    {/* ✅ Legend */}
                    <Legend wrapperStyle={{ color: "#fff" }} />

                    {/* ✅ Chats Line */}
                    <Line
                        type="monotone"
                        dataKey="chats"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                        name="Chats"
                    />

                    {/* ✅ Users Line */}
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                        name="Users"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}