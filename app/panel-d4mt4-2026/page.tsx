import { AdminGuard } from "@/modules/auth/admin-guard";
import { AdminDashboard } from "@/modules/admin/admin-dashboard";

// Obscure admin path (security-by-obscurity). The REAL gate is Firestore Rules
// + the email allowlist - this path just keeps admin out of public view.
export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
