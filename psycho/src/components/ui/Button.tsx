import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "coral" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: "md" | "sm";
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-sage-500 text-white active:bg-sage-600 disabled:bg-sage-200",
  secondary: "bg-peach-light text-sage-800 active:bg-peach",
  outline: "bg-transparent border border-sage-300 text-sage-700 active:bg-sage-50",
  coral: "bg-coral text-white active:bg-coral-dark",
  ghost: "bg-transparent text-sage-700 active:bg-sage-50",
};

export function Button({
  variant = "primary",
  fullWidth = true,
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        size === "md" ? "px-5 py-3.5 text-[15px]" : "px-4 py-2 text-sm",
        fullWidth ? "w-full" : "",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
