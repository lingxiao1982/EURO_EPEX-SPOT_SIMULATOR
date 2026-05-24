import { LayoutShell } from "@/components/layout-shell";
import { Card } from "@/components/ui/card";
import { sampleBids } from "@/lib/mock-data";

export default function DayAheadBiddingPage() {
  const rows = sampleBids.filter((b) => b.market === "DAY_AHEAD");
  return <LayoutShell><h2 className="mb-4 text-2xl">Day-Ahead Bidding</h2><Card><table className="w-full text-sm"><thead><tr><th>Hour</th><th>Side</th><th>MW</th><th>Bid Price</th></tr></thead><tbody>{rows.map((r, i) => <tr key={i}><td>{r.hour}</td><td>{r.side}</td><td>{r.powerMw}</td><td>{r.price}</td></tr>)}</tbody></table></Card></LayoutShell>;
}
