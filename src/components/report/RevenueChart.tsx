import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface Props {
  data: any[];
}

export default function RevenueChart({ data }: Props) {
  // lấy 7 dữ liệu gần nhất
  const latestData = [...data].slice(-7);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* LINE CHART */}
      <div className="bg-white p-5 rounded-2xl shadow border">
        <h2 className="font-bold text-lg mb-4">
          Revenue Trend (Last 7 Days)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={latestData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-5 rounded-2xl shadow border">
        <h2 className="font-bold text-lg mb-4">
          Revenue Overview (Last 7 Days)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={latestData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#22c55e"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}