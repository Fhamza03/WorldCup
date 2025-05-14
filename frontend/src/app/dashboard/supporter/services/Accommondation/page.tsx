import Sidebar from "@/components/dashboard/layout/sidebar";
import AccommodationFinderApp from "@/components/dashboard/services/Accommondation/accommodationFinderApp";

import React from "react";

function Page() {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4">
        <AccommodationFinderApp />
      </main>
    </div>
  );
}

export default Page;
