import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import DeliveryHistoryPage from "@/components/dashboard/user/DeliveryHistoryPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["user"]}>
        <DeliveryHistoryPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}
