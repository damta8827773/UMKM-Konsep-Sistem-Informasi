"use client";

import { Card } from "@/common/components/ui/card";
import { useI18n } from "@/i18n/provider";

/** Friendly guidance shown when Firebase env vars are missing or rules block reads. */
export function ConfigNotice({ message }: { message?: string }) {
  const { t } = useI18n();
  return (
    <Card className="mx-auto max-w-lg p-8 text-center">
      <div className="mb-3 text-4xl">🔧</div>
      <h2 className="mb-2 text-lg font-bold">{t("config.notReady")}</h2>
      <p className="mb-4 text-sm text-muted">{message ?? t("config.notReadyDesc")}</p>
      <pre className="overflow-x-auto rounded-lg bg-surface-2 px-4 py-3 text-left text-xs text-muted">
        cp .env.local.example .env.local{"\n"}# isi NEXT_PUBLIC_FIREBASE_* (key yang sudah dirotasi){"\n"}npm run dev
      </pre>
    </Card>
  );
}
