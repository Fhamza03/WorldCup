import { ContextProvider } from "@/context/context";
import { Sidebar } from "lucide-react";
import React, { ReactNode } from "react";

function Page({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <div className="flex h-screen w-full bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </ContextProvider>
  );
}

export default Page;
