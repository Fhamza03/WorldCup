import BusRoutesAndDepartures from "@/components/dashboard/services/Transportation/bus/busRoutesAndDepartures";
import BusSchedule from "@/components/dashboard/services/Transportation/utils/TransportSchedule";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <BusSchedule title="Bus Schedule" />
      </div>
      <div className="flex flex-1 items-center justify-center flex-col">
        <BusRoutesAndDepartures />
        {/* <BusRoutesAndDepartures /> */}
      </div>
    </div>
  );
}

export default Page;
