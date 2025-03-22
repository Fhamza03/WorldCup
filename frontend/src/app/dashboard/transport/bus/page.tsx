import BusRoutesAndDepartures from "@/components/dashboard/bus/busRoutesAndDepartures";
import BusSchedule from "@/components/dashboard/bus/busSchedule";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <BusSchedule />
      </div>
      <div className="flex flex-1 min-h-0 items-center justify-center">
        <BusRoutesAndDepartures />
      </div>
    </div>
  );
}

export default Page;
