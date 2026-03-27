import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { name: "Mon", users: 40 },
    { name: "Tue", users: 60 },
    { name: "Wed", users: 80 },
    { name: "Thu", users: 50 },
    { name: "Fri", users: 90 },
    { name: "Sat", users: 70 },
    { name: "Sun", users: 100 },
];

const BarChartActiveusers = () => {
    return (
        <div className="bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#020617] p-4 rounded-2xl shadow-md w-full h-[280px]">

            {/* Title */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-white text-sm font-semibold">
                    Active Users
                </h2>
                <span className="text-green-400 text-xs">+15%</span>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

                    <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        stroke="#9CA3AF"
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111827",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />

                    <Bar
                        dataKey="users"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartActiveusers;