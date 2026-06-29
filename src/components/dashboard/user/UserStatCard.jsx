"use client";

export default function UserStatCard({
  title,
  value,
  icon,
  color = "bg-primary",
}) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body flex-row justify-between items-center">
        <div>
          <p className="text-base-content/70">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className={`${color} text-white rounded-2xl p-4 text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
