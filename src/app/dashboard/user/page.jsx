import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import UserDashboardHome from "@/components/dashboard/user/UserDashboardHome";

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["user"]}>
        <UserDashboardHome />
      </RoleRoute>
    </ProtectedRoute>
  );
}
