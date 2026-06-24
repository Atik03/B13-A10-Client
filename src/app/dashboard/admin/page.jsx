import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Users" value="300" />

        <StatCard title="Books" value="900" />

        <StatCard title="Deliveries" value="450" />

        <StatCard title="Revenue" value="$1500" />
      </div>
    </div>
  );
}
