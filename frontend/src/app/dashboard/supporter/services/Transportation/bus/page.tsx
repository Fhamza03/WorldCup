import BusRoutesAndDepartures from "@/components/dashboard/services/Transportation/bus/busRoutesAndDepartures";
import BusSchedule from "@/components/dashboard/services/Transportation/bus/busSchedule";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <BusSchedule />
      </div>
      <div className="flex flex-1 items-center justify-center flex-col">
        <BusRoutesAndDepartures />
        {/* <BusRoutesAndDepartures /> */}
      </div>
    </div>
  );
}

export default Page;
