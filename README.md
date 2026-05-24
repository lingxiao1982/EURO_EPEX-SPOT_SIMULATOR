# German BESS Simulator (V1)

学习用途的德国储能交易模拟系统（不连接真实交易 API，不自动下单）。

## V1 页面
- Left Navigation
- Dashboard
- Market Prices
- Day-Ahead Bidding
- Intraday Trading
- Balancing Market
- Battery SOC Dispatch
- Settlement

## 技术栈
Next.js + TypeScript + Tailwind CSS + shadcn/ui风格组件 + Recharts + Zustand + SQLite/Prisma + Vitest

## 本地运行
```bash
npm install
npm run dev
npm run test
```

## 数据
全部为 mock data，位于 `lib/mock-data.ts`。
