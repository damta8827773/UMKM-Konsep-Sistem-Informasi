"use client";

import { useState } from "react";
import { ShieldAlert, LogOut } from "lucide-react";
import { toast } from "sonner";
import { GoogleLogo } from "@/common/components/google-logo";
import { useAuth } from "@/contexts/auth-context";
import { useI18n } from "@/i18n/provider";
import { signInWithGoogle, signOut, ADMIN_EMAIL } from "@/services/firebase/auth";
import { isFirebaseConfigured } from "@/services/firebase/client";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { ConfigNotice } from "@/common/components/config-notice";

export function LoginCard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);

  if (!isFirebaseConfigured) return <ConfigNotice message={t("config.loginNeeds")} />;

  async function handleLogin() {
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      toast.error(t("auth.loginFailed"), { description: e instanceof Error ? e.message : "" });
    } finally {
      setBusy(false);
    }
  }

  // Signed in but NOT the allowed admin → block with a clear warning.
  if (user) {
    return (
      <Card className="mx-auto max-w-md p-8 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-danger-soft text-danger">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h2 className="mb-1 text-lg font-bold text-danger">{t("auth.accessDenied")}</h2>
        <p className="mb-1 text-sm text-muted">
          {t("auth.account")} <span className="font-semibold text-text">{user.email}</span> {t("auth.notAllowed")}
        </p>
        <p className="mb-5 text-xs text-faint">{t("auth.onlyAllowed", { email: ADMIN_EMAIL })}</p>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" /> {t("auth.signOutSwitch")}
        </Button>
      </Card>
    );
  }

  // Not signed in.
  return (
    <Card className="mx-auto max-w-md p-8 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-2xl">🔐</div>
      <h2 className="mb-1 text-lg font-bold">{t("auth.adminPanel")}</h2>
      <p className="mb-5 text-sm text-muted">{t("auth.adminPanelDesc")}</p>
      <Button variant="outline" onClick={handleLogin} disabled={busy} className="mx-auto bg-surface">
        <GoogleLogo className="h-[18px] w-[18px]" /> {busy ? t("auth.opening") : t("auth.signIn")}
      </Button>
    </Card>
  );
}
