import { Card } from "@/components/ui/card";
import { LayoutShell } from "@/components/layout-shell";
import { calculateRevenue } from "@/lib/calc";
import { mockPriceCurve, sampleBids } from "@/lib/mock-data";

export default function DashboardPage() {
  const pnl = calculateRevenue(sampleBids, mockPriceCurve);
  return (
    <LayoutShell>
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><div className="text-sm text-slate-400">Gross Revenue</div><div className="text-xl">€{pnl.grossRevenue.toFixed(2)}</div></Card>
        <Card><div className="text-sm text-slate-400">Gross Cost</div><div className="text-xl">€{pnl.grossCost.toFixed(2)}</div></Card>
        <Card><div className="text-sm text-slate-400">Net PnL</div><div className="text-xl">€{pnl.netPnl.toFixed(2)}</div></Card>
      </div>
    </LayoutShell>
  );
}
