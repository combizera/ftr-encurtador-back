interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ButtonPrimary({ disabled = false, children = "Label", ...props }: ButtonPrimaryProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        inline-block
        cursor-pointer
        w-[300px]
        px-8 py-4
        text-white text-sm font-medium text-center
        rounded-md
        transition-colors duration-300
        w-full
        ${disabled
          ? "bg-gray-300 cursor-not-allowed pointer-events-none"
          : "bg-[#2C46B1] hover:bg-[#2C4091]"}
        ${props.className ?? ""}
      `}
    >
      {children}
    </button>
  );
}
