"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/dashboard", "Dashboard"],
  ["/market-prices", "Market Prices"],
  ["/day-ahead-bidding", "Day-Ahead Bidding"],
  ["/intraday-trading", "Intraday Trading"],
  ["/balancing-market", "Balancing Market"],
  ["/battery-soc-dispatch", "Battery SOC Dispatch"],
  ["/settlement", "Settlement"],
] as const;

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4">
      <h1 className="mb-6 text-lg font-semibold text-cyan-300">German BESS Simulator</h1>
      <nav className="space-y-1">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className={`block rounded px-3 py-2 text-sm ${pathname === href ? "bg-slate-800 text-cyan-300" : "text-slate-300 hover:bg-slate-900"}`}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
