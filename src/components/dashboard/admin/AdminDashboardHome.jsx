"use client";

import useAdminDashboard from "@/hooks/useAdminDashboard";

import AdminStatCard from "./AdminStatCard";
import AdminOverviewChart from "./AdminOverviewChart";

export default function AdminDashboardHome() {
  const { stats, loading } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Monitor the entire BookNest platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AdminStatCard title="Total Users" value={stats.totalUsers} />

        <AdminStatCard title="Total Librarians" value={stats.totalLibrarians} />

        <AdminStatCard title="Total Books" value={stats.totalBooks} />

        <AdminStatCard title="Pending Books" value={stats.pendingBooks} />

        <AdminStatCard title="Published Books" value={stats.publishedBooks} />

        <AdminStatCard title="Rejected Books" value={stats.rejectedBooks} />
      </div>

      <AdminOverviewChart
        pending={stats.pendingBooks}
        published={stats.publishedBooks}
        rejected={stats.rejectedBooks}
      />
    </div>
  );
}
