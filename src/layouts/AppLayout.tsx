import type { ReactNode } from "react";
import { AppSidebar, MobileTabBar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background bg-mesh">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
