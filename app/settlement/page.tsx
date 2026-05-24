import { LayoutShell } from "@/components/layout-shell";
import { SectionTitle } from "@/components/section-title";
import { Card } from "@/components/ui/card";
import { calculateRevenue } from "@/lib/calc";
import { mockPriceCurve, sampleBids } from "@/lib/mock-data";

export default function SettlementPage() {
  const settlement = calculateRevenue(sampleBids, mockPriceCurve);
  const margin = settlement.grossRevenue > 0 ? (settlement.netPnl / settlement.grossRevenue) * 100 : 0;

  return (
    <LayoutShell>
      <SectionTitle title="Settlement" subtitle="Daily mark-to-market settlement based on mock cleared prices." />
      <Card>
        <div className="space-y-2 text-sm">
          <div>Gross Revenue: €{settlement.grossRevenue.toFixed(2)}</div>
          <div>Gross Cost: €{settlement.grossCost.toFixed(2)}</div>
          <div className="font-semibold">Net PnL: €{settlement.netPnl.toFixed(2)}</div>
          <div>PnL Margin: {margin.toFixed(2)}%</div>
        </div>
      </Card>
    </LayoutShell>
  );
}
