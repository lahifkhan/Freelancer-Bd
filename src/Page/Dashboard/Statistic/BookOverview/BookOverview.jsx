import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const BookOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["booksStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books-stats");
      return res.data;
    },
  });

  return (
    <div className="bg-base-100 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Books Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="40%">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="count" barSize={25} radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookOverview;
