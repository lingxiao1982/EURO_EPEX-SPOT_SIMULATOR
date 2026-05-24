"use client";
import { LayoutShell } from "@/components/layout-shell";
import { mockPriceCurve } from "@/lib/mock-data";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MarketPricesPage() {
  return <LayoutShell><h2 className="mb-4 text-2xl">Market Prices</h2><div className="h-[420px] rounded-xl border border-slate-700 bg-panel p-3"><ResponsiveContainer><LineChart data={mockPriceCurve}><CartesianGrid stroke="#334155"/><XAxis dataKey="hour"/><YAxis/><Tooltip/><Legend/><Line dataKey="dayAhead" stroke="#22d3ee"/><Line dataKey="intraday" stroke="#f59e0b"/><Line dataKey="afrr" stroke="#10b981"/></LineChart></ResponsiveContainer></div></LayoutShell>;
}
