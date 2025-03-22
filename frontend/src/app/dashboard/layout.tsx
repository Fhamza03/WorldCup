import Sidebar from "@/components/dashboard/sideBar/sideBar";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex login-gradient h-screen">
      <Sidebar />
      <div className="flex-[10] overflow-auto">{children}</div>
    </div>
  );
}

export default Layout;
