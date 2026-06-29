"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981"];

export default function UserOverviewChart({ stats }) {
  const data = [
    {
      name: "Books Read",
      value: stats.totalBooksRead,
    },
    {
      name: "Pending",
      value: stats.pendingDeliveries,
    },
    {
      name: "Fees",
      value: stats.totalSpent,
    },
  ];

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-6">Overview</h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={110} label>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
