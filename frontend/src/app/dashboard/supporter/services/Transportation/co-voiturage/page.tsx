import CoVoiturageRoutesAndDepartures from "@/components/dashboard/services/Transportation/co-voiturage/coVoiturageRoutesAndDepartures";
import CoVoiturageSchedule from "@/components/dashboard/services/Transportation/utils/TransportSchedule";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <CoVoiturageSchedule title="Co-Voiturage Schedule" />
      </div>
      <div className="flex flex-1 items-center justify-center flex-col">
        <CoVoiturageRoutesAndDepartures />
      </div>
    </div>
  );
}

export default Page;
