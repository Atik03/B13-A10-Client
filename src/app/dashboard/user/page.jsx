import StatCard from "@/components/dashboard/StatCard";

export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Books Read" value="24" />

        <StatCard title="Pending Deliveries" value="2" />

        <StatCard title="Fees Spent" value="$35" />
      </div>
    </div>
  );
}
