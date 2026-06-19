"use client";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { LoginCard } from "./login-card";

/** Gates admin UI. Real enforcement is Firestore Rules; this is the UX layer. */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="grid place-items-center py-24 text-muted">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!isAdmin) return <LoginCard />;
  return <>{children}</>;
}
