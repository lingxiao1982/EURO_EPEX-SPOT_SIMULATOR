import { BidOrder, DispatchPoint, PlantConfig, PricePoint } from "@/lib/types";

export function getMarketPrice(point: PricePoint, market: BidOrder["market"]) {
  if (market === "DAY_AHEAD") return point.dayAhead;
  if (market === "INTRADAY_CONTINUOUS" || market === "INTRADAY_AUCTION") return point.intraday;
  if (market === "FCR") return point.fcr;
  if (market === "aFRR") return point.afrr;
  return point.mfrr;
}

export function simulateDispatch(config: PlantConfig, bids: BidOrder[]) {
  const minSoc = config.usableCapacityMWh * (config.minSocPct / 100);
  const maxSoc = config.usableCapacityMWh * (config.maxSocPct / 100);
  const eff = Math.sqrt(config.poiRte);

  let soc = config.initialSocMWh;
  const byHour: Record<number, number> = {};

  for (const b of bids) {
    const p = Math.min(Math.max(b.powerMw, 0), b.side === "CHARGE" ? config.maxChargeMw : config.maxDischargeMw);
    if (b.side === "CHARGE") {
      const chargeMWh = Math.min(p * eff, maxSoc - soc);
      soc += Math.max(chargeMWh, 0);
      byHour[b.hour] = (byHour[b.hour] ?? 0) - p;
    } else {
      const dischargeMWh = Math.min(p / eff, soc - minSoc);
      soc -= Math.max(dischargeMWh, 0);
      byHour[b.hour] = (byHour[b.hour] ?? 0) + p;
    }
  }

  const curve: DispatchPoint[] = [];
  const finalSoc = Math.max(minSoc, Math.min(maxSoc, soc));
  for (let h = 0; h < 24; h++) {
    curve.push({ hour: h, socMWh: Number(finalSoc.toFixed(2)), socPct: Number((finalSoc / config.usableCapacityMWh * 100).toFixed(2)), netPowerMw: byHour[h] ?? 0 });
  }
  return curve;
}

export function calculateRevenue(bids: BidOrder[], prices: PricePoint[]) {
  let grossRevenue = 0;
  let grossCost = 0;
  for (const bid of bids) {
    const pricePoint = prices.find((p) => p.hour === bid.hour);
    if (!pricePoint) continue;
    const settledPrice = getMarketPrice(pricePoint, bid.market);
    const value = settledPrice * bid.powerMw;
    if (bid.side === "DISCHARGE") grossRevenue += value;
    else grossCost += value;
  }
  const netPnl = grossRevenue - grossCost;
  return { grossRevenue, grossCost, netPnl };
}
