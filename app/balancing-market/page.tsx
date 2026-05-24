import { LayoutShell } from "@/components/layout-shell";
import { Card } from "@/components/ui/card";
import { sampleBids } from "@/lib/mock-data";

export default function BalancingPage() {
  const rows = sampleBids.filter((b) => ["FCR", "aFRR", "mFRR"].includes(b.market));
  return <LayoutShell><h2 className="mb-4 text-2xl">Balancing Market</h2><Card><div className="text-sm">FCR/aFRR/mFRR mock awards:</div><ul className="mt-3 space-y-2 text-sm">{rows.map((r, i) => <li key={i}>{r.market} H{r.hour} {r.side} {r.powerMw}MW</li>)}</ul></Card></LayoutShell>;
}
