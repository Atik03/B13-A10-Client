import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import MyReviewsPage from "@/components/dashboard/user/MyReviewsPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["user"]}>
        <MyReviewsPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}
