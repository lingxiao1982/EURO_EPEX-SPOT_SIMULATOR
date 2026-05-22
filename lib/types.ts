export type MarketProduct = "DAY_AHEAD" | "INTRADAY_CONTINUOUS" | "INTRADAY_AUCTION" | "FCR" | "aFRR" | "mFRR";

export type PricePoint = {
  hour: number;
  dayAhead: number;
  intraday: number;
  fcr: number;
  afrr: number;
  mfrr: number;
};

export type BidOrder = {
  hour: number;
  market: MarketProduct;
  side: "CHARGE" | "DISCHARGE";
  powerMw: number;
  price: number;
};

export type PlantConfig = {
  ratedPowerMw: number;
  ratedCapacityMWh: number;
  usableCapacityMWh: number;
  maxChargeMw: number;
  maxDischargeMw: number;
  poiRte: number;
  minSocPct: number;
  maxSocPct: number;
  initialSocMWh: number;
};

export type DispatchPoint = {
  hour: number;
  socPct: number;
  socMWh: number;
  netPowerMw: number;
};
