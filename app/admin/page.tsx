import { AdminGuard } from "@/modules/auth/admin-guard";
import { AdminDashboard } from "@/modules/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
