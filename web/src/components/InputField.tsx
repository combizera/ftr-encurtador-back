import { Warning } from "phosphor-react";
import type { ReactNode, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  active?: boolean;
  iconLeft?: ReactNode;
  prefix?: string; // Nova prop para o prefixo
}

export function InputField({
  label,
  error,
  active = false,
  prefix,
  ...props
}: InputFieldProps) {
  const hasError = !!error;

  const borderColor = hasError
    ? "border-red-500"
    : active
      ? "border-blue-700"
      : "border-gray-300";

  const focusStyle = hasError
    ? "focus:border-red-500"
    : "focus:border-blue-700";

  const labelColor = hasError ? "text-red-600" : active ? "text-blue-700" : "text-gray-500";

  return (
    <div className="mb-4">
      <label className={`block text-xs font-semibold mb-1 uppercase ${labelColor}`}>
        {label}
      </label>

      <div className={`relative`}>
        {prefix ? (
          <div className={`flex rounded border ${borderColor} ${focusStyle} transition-all`}>
            <span className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-500 text-sm rounded-l border-r">
              {prefix}
            </span>
            <input
              className={`flex-1 px-3 py-2 text-sm rounded-r outline-none min-w-0`}
              {...props}
            />
          </div>
        ) : (
          <input
            className={`w-full px-3 py-2 text-sm rounded border ${borderColor} ${focusStyle} outline-none transition-all`}
            {...props}
          />
        )}
      </div>

      {hasError && (
        <div className="mt-1 flex items-center text-xs text-red-600 gap-1">
          <Warning size={14} />
          {error}
        </div>
      )}
    </div>
  );
}