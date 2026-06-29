import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import ReadingListPage from "@/components/dashboard/user/ReadingListPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["user"]}>
        <ReadingListPage />
      </RoleRoute>
    </ProtectedRoute>
  );
}
