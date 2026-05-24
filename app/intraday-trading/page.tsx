import { LayoutShell } from "@/components/layout-shell";
import { Card } from "@/components/ui/card";
import { sampleBids } from "@/lib/mock-data";

export default function IntradayTradingPage() {
  const rows = sampleBids.filter((b) => b.market.includes("INTRADAY"));
  return <LayoutShell><h2 className="mb-4 text-2xl">Intraday Trading</h2><Card><ul className="space-y-2 text-sm">{rows.map((r, i) => <li key={i}>H{r.hour} {r.side} {r.powerMw}MW @ €{r.price}/MWh</li>)}</ul></Card></LayoutShell>;
}
