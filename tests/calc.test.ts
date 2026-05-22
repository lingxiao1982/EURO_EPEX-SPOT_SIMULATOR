import { describe, expect, it } from "vitest";
import { calculateRevenue, simulateDispatch } from "../lib/calc";
import { defaultPlantConfig, mockPriceCurve, sampleBids } from "../lib/mock-data";

describe("calc", () => {
  it("calculates net pnl", () => {
    const r = calculateRevenue(sampleBids, mockPriceCurve);
    expect(r.grossRevenue).toBeGreaterThan(0);
    expect(r.grossCost).toBeGreaterThan(0);
    expect(r.netPnl).toBeTypeOf("number");
  });

  it("dispatch stays inside soc range", () => {
    const curve = simulateDispatch(defaultPlantConfig, sampleBids);
    for (const p of curve) {
      expect(p.socPct).toBeGreaterThanOrEqual(defaultPlantConfig.minSocPct);
      expect(p.socPct).toBeLessThanOrEqual(defaultPlantConfig.maxSocPct);
    }
  });
});
