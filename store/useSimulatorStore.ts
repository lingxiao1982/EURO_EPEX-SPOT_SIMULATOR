import { create } from "zustand";
import { simulateDay, type PlantConfig, type TradeOrder } from "@/lib/simulator";

const defaultConfig: PlantConfig = {
  maxPowerMw: 70,
  usableCapacityMWh: 112,
  roundTripEfficiency: 0.88,
  minSoc: 0.1,
  maxSoc: 0.9,
  initialSoc: 56,
};

const sampleOrders: TradeOrder[] = [
  { hour: 2, market: "DAY_AHEAD", action: "CHARGE", mw: 35, price: 45 },
  { hour: 8, market: "INTRADAY", action: "DISCHARGE", mw: 50, price: 120 },
  { hour: 18, market: "aFRR", action: "DISCHARGE", mw: 20, price: 140 },
  { hour: 22, market: "FCR", action: "CHARGE", mw: 25, price: 38 },
];

type State = {
  config: PlantConfig;
  orders: TradeOrder[];
  setUsableCapacity: (v: number) => void;
  run: () => ReturnType<typeof simulateDay>;
};

export const useSimulatorStore = create<State>((set, get) => ({
  config: defaultConfig,
  orders: sampleOrders,
  setUsableCapacity: (v) => set((s) => ({ config: { ...s.config, usableCapacityMWh: v } })),
  run: () => simulateDay(get().config, get().orders),
}));
