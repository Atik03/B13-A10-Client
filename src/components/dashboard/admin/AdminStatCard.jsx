"use client";

export default function AdminStatCard({ title, value }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-gray-500 font-semibold">{title}</h2>

        <p className="text-4xl font-bold text-primary mt-2">{value}</p>
      </div>
    </div>
  );
}
