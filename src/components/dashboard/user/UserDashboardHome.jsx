"use client";

import { useEffect, useState } from "react";

import { FaBookOpen, FaTruck, FaDollarSign } from "react-icons/fa6";

import { authClient } from "@/lib/auth-client";

import UserStatCard from "./UserStatCard";
import UserOverviewChart from "./UserOverviewChart";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UserDashboardHome() {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBooksRead: 0,
    pendingDeliveries: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchDashboard();
    }
  }, [session]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${SERVER_URL}/user/dashboard/${session.user.email}`,
      );

      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UserStatCard
          title="Books Read"
          value={stats.totalBooksRead}
          icon={<FaBookOpen />}
          color="bg-primary"
        />

        <UserStatCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={<FaTruck />}
          color="bg-warning"
        />

        <UserStatCard
          title="Total Spent"
          value={`$${stats.totalSpent}`}
          icon={<FaDollarSign />}
          color="bg-success"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <UserOverviewChart stats={stats} />

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-5">Summary</h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-3">
                <span>Total Books Read</span>

                <span className="font-bold">{stats.totalBooksRead}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Pending Deliveries</span>

                <span className="font-bold">{stats.pendingDeliveries}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Fees Paid</span>

                <span className="font-bold text-success">
                  ${stats.totalSpent}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
