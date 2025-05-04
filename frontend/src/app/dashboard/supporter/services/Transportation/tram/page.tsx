import React from "react";
import TramSchedule from "@/components/dashboard/services/Transportation/utils/TransportSchedule";
import TramRoutesAndDepartures from "@/components/dashboard/services/Transportation/tram/TramRoutesAndDepartures";

function page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <TramSchedule title="Tram Schedule" />
      </div>
      <div className="flex flex-1 items-center justify-center flex-col">
        <TramRoutesAndDepartures />
      </div>
    </div>
  );
}

export default page;
