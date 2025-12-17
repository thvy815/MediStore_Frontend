import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: "text" | "number" | "date" | "textarea" | "select";
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  options?: { label: string; value: string }[]; // dùng cho select
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  options = [],
}) => {
  const inputClass =
    "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" +
    (icon ? " pl-10" : "");

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      <label className="font-medium text-gray-700 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Icon + Input wrapper */}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {/* Textarea */}
        {type === "textarea" ? (
          <textarea
            className={inputClass + " h-28 resize-none"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : null}

        {/* Select */}
        {type === "select" ? (
          <select
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select...</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : null}

        {/* Input */}
        {type !== "textarea" && type !== "select" ? (
          <input
            type={type}
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FormField;
