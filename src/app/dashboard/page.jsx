"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserRole from "@/hooks/useUserRole";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();

  const { role, loading } = useUserRole();

  useEffect(() => {
    if (loading) return;

    if (role === "admin") {
      router.replace("/dashboard/admin");
      return;
    }

    if (role === "librarian") {
      router.replace("/dashboard/librarian");
      return;
    }

    router.replace("/dashboard/user");
  }, [role, loading, router]);

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </ProtectedRoute>
  );
}
