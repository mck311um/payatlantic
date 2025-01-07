import { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
  required?: boolean;
  name: string;
}

export function FormField({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
  required,
  name,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          required={required}
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-main/30 focus:border-main transition-colors"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
        />
      </div>
    </div>
  );
}
