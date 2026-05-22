import "./globals.css";

export const metadata = {
  title: "German BESS Trading Simulator",
  description: "Learning simulator for EPEX SPOT + balancing markets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}
