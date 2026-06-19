"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useI18n } from "@/i18n/provider";
import { useProducts } from "@/hooks/use-products";
import { useOrders } from "@/hooks/use-orders";
import { signOut } from "@/services/firebase/auth";
import { AdminKpis } from "./admin-kpis";
import { InventoryTable } from "./inventory-table";
import { OrdersTable } from "./orders-table";
import { TurnoverChart } from "./turnover-chart";
import { SupplierDonut } from "./supplier-donut";
import { Button } from "@/common/components/ui/button";
import { Skeleton } from "@/common/components/ui/skeleton";

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { products, loading } = useProducts();
  const { orders } = useOrders(true);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("admin.dashboard")}</h1>
          <p className="mt-0.5 text-sm text-muted">{t("admin.loggedInAs")} {user?.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <LogOut className="h-3.5 w-3.5" /> {t("admin.signOut")}
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <AdminKpis products={products} orders={orders} />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="flex flex-col gap-6">
          <InventoryTable products={products} />
          <TurnoverChart products={products} />
        </div>
        <div className="flex flex-col gap-6">
          <OrdersTable orders={orders} />
          <SupplierDonut products={products} />
        </div>
      </div>
    </div>
  );
}
