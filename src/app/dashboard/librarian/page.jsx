import StatCard from "@/components/dashboard/StatCard";

export default function LibrarianDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Librarian Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Books Listed" value="85" />

        <StatCard title="Total Earnings" value="$450" />

        <StatCard title="Pending Requests" value="12" />
      </div>
    </div>
  );
}
