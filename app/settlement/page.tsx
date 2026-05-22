import { LayoutShell } from "@/components/layout-shell";
import { Card } from "@/components/ui/card";
import { calculateRevenue } from "@/lib/calc";
import { mockPriceCurve, sampleBids } from "@/lib/mock-data";

export default function SettlementPage() {
  const settlement = calculateRevenue(sampleBids, mockPriceCurve);
  return <LayoutShell><h2 className="mb-4 text-2xl">Settlement</h2><Card><div className="space-y-2 text-sm"><div>Gross Revenue: €{settlement.grossRevenue.toFixed(2)}</div><div>Gross Cost: €{settlement.grossCost.toFixed(2)}</div><div className="font-semibold">Net PnL: €{settlement.netPnl.toFixed(2)}</div></div></Card></LayoutShell>;
}
