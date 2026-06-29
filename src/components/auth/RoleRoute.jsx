"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserRole from "@/hooks/useUserRole";

export default function RoleRoute({ children, allowedRoles = [] }) {
  const router = useRouter();

  const { role, loading } = useUserRole();

  useEffect(() => {
    if (!loading && !allowedRoles.includes(role)) {
      router.push("/");
    }
  }, [loading, role, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return children;
}
