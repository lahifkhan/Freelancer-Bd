import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const OrderOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["orderStatusStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-status-stats");
      return res.data;
    },
  });

  const COLORS = ["#facc15", "#38bdf8", "#22c55e", "#ef4444"];

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Order Status Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderOverview;
