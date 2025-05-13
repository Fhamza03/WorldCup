import React from "react";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  setFormData?: (data: string | number | boolean) => void;
}

// Input field component
const FormField = ({
  label,
  id,
  type = "text",
  required = false,
  value,
  setFormData,
}: FormFieldProps) => {
  // If the type is date, we'll use datetime-local instead
  const inputType = type === "date" ? "datetime-local" : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={inputType}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => setFormData && setFormData(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormField;
