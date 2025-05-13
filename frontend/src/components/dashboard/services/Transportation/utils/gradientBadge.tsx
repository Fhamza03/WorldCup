import React from "react";

// GradientBadge component based on the provided image
const GradientBadge = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white font-bold text-xl h-10 w-16 shadow-md">
      {value}
    </div>
  );
};

export default GradientBadge;
