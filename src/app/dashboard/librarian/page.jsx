"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";
import LibrarianDashboardHome from "@/components/dashboard/LibrarianDashboardHome";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["librarian"]}>
        <LibrarianDashboardHome />
      </RoleRoute>
    </ProtectedRoute>
  );
}
