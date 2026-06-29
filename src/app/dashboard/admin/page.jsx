import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["admin"]}>
        <h1>Admin Dashboard</h1>
      </RoleRoute>
    </ProtectedRoute>
  );
}
