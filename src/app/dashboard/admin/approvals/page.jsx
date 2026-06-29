import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import ApprovalQueue from "@/components/dashboard/admin/ApprovalQueue";

export default function ApprovalQueuePage() {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={["admin"]}>
        <ApprovalQueue />
      </RoleRoute>
    </ProtectedRoute>
  );
}
