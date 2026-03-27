import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../config/api";
import { useEffect, useState } from "react";

// ✅ Types
type Analytics = {
  short: number;
  medium: number;
  long: number;
  avg: number;
  growth: number;
};

type ChartData = {
  name: string;
  value: number;
};

const COLORS: string[] = ["#4ADE80", "#22C55E", "#14532D"];

const ConversationDepthChart: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("_user_Identy_v3");
    if (id) setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await api.get<Analytics>(
          `/api/patner/admin/partner/conversations/depth/dashboard/${userId}`
        );
        setAnalytics(res.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, [userId]);

  const chartData: ChartData[] = analytics
    ? [
      { name: "Short", value: analytics.short },
      { name: "Medium", value: analytics.medium },
      { name: "Long", value: analytics.long },
    ]
    : [];

  if (!analytics) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className=" flex justify-between items-center relative bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#020617] p-4 rounded-2xl shadow-md w-full ">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-white text-lg font-semibold">
            Conversation Depth
          </h2>
          <p className="text-gray-400 text-sm">Last 7 days</p>
        </div>

        <div>
          <h1 className="text-white text-4xl font-bold">
            {analytics.avg.toFixed(1)}
          </h1>
          <p className="text-gray-400 text-sm">Messages per chat</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            Short
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600"></span>
            Medium
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-900"></span>
            Long
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CHART */}
      <div className="relative w-[180px] h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              cornerRadius={8}
              isAnimationActive
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: any, name: any) => [
                value,
                name,
              ]}
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-white text-2xl font-bold">
            {analytics.avg.toFixed(1)}
          </h2>
          <p className="text-gray-400 text-xs text-center">
            Avg messages per chat
          </p>
        </div>
      </div>

      {/* Growth */}
      <div className="absolute top-4 right-6 text-green-400 text-sm">
        +{analytics.growth}%
      </div>
    </div>
  );
};

export default ConversationDepthChart;