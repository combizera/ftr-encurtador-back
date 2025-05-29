import type { ReactNode } from "react";

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function ButtonSecondary({
  children,
  onClick,
  title,
  disabled = false,
  type = "button",
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 text-sm font-medium
        rounded px-3 py-1
        border border-gray-100 
        text-gray-600 bg-gray-100
        transition duration-200
        cursor-pointer 
        hover:bg-gray-200 hover:text-gray-800 hover:border hover:border-blue-500 
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}
