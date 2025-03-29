import Sidebar from "@/components/dashboard/layout/sidebar";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}

export default Layout;
