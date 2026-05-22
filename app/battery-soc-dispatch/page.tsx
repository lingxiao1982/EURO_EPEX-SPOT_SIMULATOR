"use client";
import { LayoutShell } from "@/components/layout-shell";
import { defaultPlantConfig, sampleBids } from "@/lib/mock-data";
import { simulateDispatch } from "@/lib/calc";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DispatchPage() {
  const points = simulateDispatch(defaultPlantConfig, sampleBids);
  return <LayoutShell><h2 className="mb-4 text-2xl">Battery SOC Dispatch</h2><div className="h-[420px] rounded-xl border border-slate-700 bg-panel p-3"><ResponsiveContainer><LineChart data={points}><CartesianGrid stroke="#334155"/><XAxis dataKey="hour"/><YAxis/><Tooltip/><Line dataKey="socPct" stroke="#22d3ee"/></LineChart></ResponsiveContainer></div></LayoutShell>;
}
