import { Card } from "@/components/ui/card";
import { LayoutShell } from "@/components/layout-shell";
import { SectionTitle } from "@/components/section-title";
import { calculateRevenue } from "@/lib/calc";
import { mockPriceCurve, sampleBids } from "@/lib/mock-data";

function coverageRatio(totalHours: number, tradedHours: number) {
  if (totalHours <= 0) return 0;
  return Number(((tradedHours / totalHours) * 100).toFixed(2));
}

export default function DashboardPage() {
  const pnl = calculateRevenue(sampleBids, mockPriceCurve);
  const tradedHours = new Set(sampleBids.map((b) => b.hour)).size;
  const marketCoveragePct = coverageRatio(24, tradedHours);

  return (
    <LayoutShell>
      <SectionTitle title="Dashboard" subtitle="Mock-only learning dashboard for German BESS trading." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><div className="text-sm text-slate-400">Gross Revenue</div><div className="text-xl">€{pnl.grossRevenue.toFixed(2)}</div></Card>
        <Card><div className="text-sm text-slate-400">Gross Cost</div><div className="text-xl">€{pnl.grossCost.toFixed(2)}</div></Card>
        <Card><div className="text-sm text-slate-400">Net PnL</div><div className="text-xl">€{pnl.netPnl.toFixed(2)}</div></Card>
        <Card><div className="text-sm text-slate-400">Market Coverage</div><div className="text-xl">{marketCoveragePct}%</div></Card>
      </div>
    </LayoutShell>
  );
}
