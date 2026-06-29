"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminOverviewChart({ pending, published, rejected }) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Published",
      value: published,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-5">Books Overview</h2>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={130} label>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
