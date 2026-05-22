import { BidOrder, PlantConfig, PricePoint } from "@/lib/types";

export const defaultPlantConfig: PlantConfig = {
  ratedPowerMw: 70,
  ratedCapacityMWh: 140,
  usableCapacityMWh: 112,
  maxChargeMw: 70,
  maxDischargeMw: 70,
  poiRte: 0.88,
  minSocPct: 10,
  maxSocPct: 90,
  initialSocMWh: 56,
};

export const mockPriceCurve: PricePoint[] = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  dayAhead: 45 + Math.sin(hour / 24 * Math.PI * 2) * 20 + (hour > 17 ? 25 : 0),
  intraday: 50 + Math.cos(hour / 24 * Math.PI * 2) * 18 + (hour > 18 ? 18 : 0),
  fcr: 18 + (hour % 6) * 1.8,
  afrr: 65 + (hour > 6 && hour < 10 ? 35 : 0) + (hour > 18 ? 20 : 0),
  mfrr: 72 + (hour > 7 && hour < 9 ? 40 : 0) + (hour > 19 ? 28 : 0),
})).map((p) => ({
  ...p,
  dayAhead: Number(p.dayAhead.toFixed(2)),
  intraday: Number(p.intraday.toFixed(2)),
  fcr: Number(p.fcr.toFixed(2)),
  afrr: Number(p.afrr.toFixed(2)),
  mfrr: Number(p.mfrr.toFixed(2)),
}));

export const sampleBids: BidOrder[] = [
  { hour: 2, market: "DAY_AHEAD", side: "CHARGE", powerMw: 40, price: 38 },
  { hour: 8, market: "INTRADAY_CONTINUOUS", side: "DISCHARGE", powerMw: 50, price: 128 },
  { hour: 18, market: "aFRR", side: "DISCHARGE", powerMw: 25, price: 140 },
  { hour: 22, market: "FCR", side: "CHARGE", powerMw: 30, price: 30 },
];
