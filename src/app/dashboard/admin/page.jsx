import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import AdminDashboardHome from "@/components/dashboard/admin/AdminDashboardHome";

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["admin"]}>
        <AdminDashboardHome />
      </RoleRoute>
    </ProtectedRoute>
  );
}
