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



export default function LineChartOur(analytics: any) {
    const formattedData = formatData(analytics?.analytics?.data || []);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "100%",
                height: "350px",
                background: "linear-gradient(to bottom right, #0F172A, #111827, #020617)", // ✅ black bg
                padding: "16px",
                borderRadius: "6px",
                border: "1px solid #374151", 
                
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
                        name="Messages"
                    />

                    {/* ✅ Users Line */}
                    {/* <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                        name="Users"
                    /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}