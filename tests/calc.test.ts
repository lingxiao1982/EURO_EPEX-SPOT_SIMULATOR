import { describe, expect, it } from "vitest";
import { calculateRevenue, simulateDispatch } from "../lib/calc";
import { defaultPlantConfig, mockPriceCurve, sampleBids } from "../lib/mock-data";

describe("calc", () => {
  it("calculates net pnl", () => {
    const r = calculateRevenue(sampleBids, mockPriceCurve);
    expect(r.grossRevenue).toBeGreaterThan(0);
    expect(r.grossCost).toBeGreaterThan(0);
    expect(r.netPnl).toBeTypeOf("number");
    expect(Number((r.grossRevenue - r.grossCost).toFixed(6))).toBe(Number(r.netPnl.toFixed(6)));
  });

  it("dispatch stays inside soc range", () => {
    const curve = simulateDispatch(defaultPlantConfig, sampleBids);
    for (const p of curve) {
      expect(p.socPct).toBeGreaterThanOrEqual(defaultPlantConfig.minSocPct);
      expect(p.socPct).toBeLessThanOrEqual(defaultPlantConfig.maxSocPct);
    }
  });

  it("dispatch creates hour-by-hour soc changes instead of flat curve", () => {
    const curve = simulateDispatch(defaultPlantConfig, sampleBids);
    const uniqueSoc = new Set(curve.map((p) => p.socMWh));
    expect(uniqueSoc.size).toBeGreaterThan(1);
  });
});
