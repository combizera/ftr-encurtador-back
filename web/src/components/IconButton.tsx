import type { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
}

export function IconButton({ children, onClick, title }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        p-1.5 
        rounded 
        bg-gray-100 
        text-gray-800
        border
        border-gray-100 
        hover:border 
        hover:border-blue-500 
        cursor-pointer 
        transition 
        duration-200
      "
    >
      {children}
    </button>
  );
}
