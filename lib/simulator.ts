export type Market = "DAY_AHEAD" | "INTRADAY" | "FCR" | "aFRR" | "mFRR";

export type TradeOrder = { hour: number; market: Market; action: "CHARGE" | "DISCHARGE"; mw: number; price: number };

export type PlantConfig = {
  maxPowerMw: number;
  usableCapacityMWh: number;
  roundTripEfficiency: number;
  minSoc: number;
  maxSoc: number;
  initialSoc: number;
};

export function simulateDay(config: PlantConfig, orders: TradeOrder[]) {
  let soc = config.initialSoc;
  let cash = 0;
  const socCurve: Array<{ hour: number; soc: number }> = [];
  const trades = orders.map((order) => {
    const energy = order.mw;
    const eff = Math.sqrt(config.roundTripEfficiency);
    if (order.action === "CHARGE") {
      const charged = Math.min(energy * eff, config.maxSoc * config.usableCapacityMWh - soc);
      soc += charged;
      cash -= order.price * charged;
      return { ...order, executedMWh: charged, pnl: -order.price * charged };
    }
    const discharge = Math.min(energy / eff, soc - config.minSoc * config.usableCapacityMWh);
    soc -= discharge;
    cash += order.price * discharge;
    return { ...order, executedMWh: discharge, pnl: order.price * discharge };
  });

  for (let h = 0; h < 24; h++) socCurve.push({ hour: h, soc: Number((soc / config.usableCapacityMWh * 100).toFixed(2)) });
  const avg = trades.length ? cash / trades.length : 0;
  const variance = trades.length ? trades.reduce((acc, t) => acc + (t.pnl - avg) ** 2, 0) / trades.length : 0;

  return { trades, socCurve, totalPnl: cash, risk: { pnlVolatility: Math.sqrt(variance) } };
}
