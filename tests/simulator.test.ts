import { describe, it, expect } from "vitest";
import { simulateDay } from "../lib/simulator";

describe("simulateDay", () => {
  it("calculates pnl and respects SOC limits", () => {
    const result = simulateDay(
      { maxPowerMw: 70, usableCapacityMWh: 112, roundTripEfficiency: 0.88, minSoc: 0.1, maxSoc: 0.9, initialSoc: 56 },
      [
        { hour: 1, market: "DAY_AHEAD", action: "CHARGE", mw: 30, price: 50 },
        { hour: 8, market: "INTRADAY", action: "DISCHARGE", mw: 20, price: 140 },
      ],
    );
    expect(result.totalPnl).toBeTypeOf("number");
    expect(result.socCurve[0].soc).toBeGreaterThanOrEqual(10);
    expect(result.socCurve[0].soc).toBeLessThanOrEqual(90);
  });
});
