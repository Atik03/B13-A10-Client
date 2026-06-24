export default function StatCard({ title, value }) {
  return (
    <div className="stats shadow bg-base-100">
      <div className="stat">
        <div className="stat-title">{title}</div>

        <div className="stat-value text-primary">{value}</div>
      </div>
    </div>
  );
}
