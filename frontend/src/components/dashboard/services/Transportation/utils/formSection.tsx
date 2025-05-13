import React from "react";
import GradientBadge from "./gradientBadge";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  badgeValue: string;
}

// Section component to group related form fields
const FormSection = ({ title, children, badgeValue }: FormSectionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <GradientBadge value={badgeValue} />
        <h3 className="text-lg font-semibold ml-3">{title}</h3>
      </div>
      <div className="pl-2">{children}</div>
    </div>
  );
};
export default FormSection;
