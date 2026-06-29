import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["user"]}>
        <h1>User Dashboard</h1>
      </RoleRoute>
    </ProtectedRoute>
  );
}
