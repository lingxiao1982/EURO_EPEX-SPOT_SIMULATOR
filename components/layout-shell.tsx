import { Sidebar } from "@/components/sidebar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen bg-background text-slate-100"><Sidebar /><div className="flex-1 p-6">{children}</div></div>;
}
