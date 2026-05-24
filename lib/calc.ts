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

  let soc = Math.max(minSoc, Math.min(maxSoc, config.initialSocMWh));
  const ordersByHour = new Map<number, BidOrder[]>();

  for (const bid of bids) {
    const existing = ordersByHour.get(bid.hour) ?? [];
    existing.push(bid);
    ordersByHour.set(bid.hour, existing);
  }

  const curve: DispatchPoint[] = [];

  for (let hour = 0; hour < 24; hour++) {
    let netPowerMw = 0;
    const hourOrders = ordersByHour.get(hour) ?? [];

    for (const order of hourOrders) {
      const power = Math.min(
        Math.max(order.powerMw, 0),
        order.side === "CHARGE" ? config.maxChargeMw : config.maxDischargeMw,
      );

      if (order.side === "CHARGE") {
        const acceptedMWh = Math.min(power * eff, maxSoc - soc);
        soc += Math.max(0, acceptedMWh);
        netPowerMw -= power;
      } else {
        const deliveredMWh = Math.min(power / eff, soc - minSoc);
        soc -= Math.max(0, deliveredMWh);
        netPowerMw += power;
      }
    }

    curve.push({
      hour,
      socMWh: Number(soc.toFixed(2)),
      socPct: Number(((soc / config.usableCapacityMWh) * 100).toFixed(2)),
      netPowerMw: Number(netPowerMw.toFixed(2)),
    });
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
