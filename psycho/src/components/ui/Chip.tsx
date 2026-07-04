import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: "default" | "coral";
  className?: string;
}

export function Chip({ children, active = false, onClick, variant = "default", className = "" }: ChipProps) {
  const base = "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors select-none";
  const styles =
    variant === "coral"
      ? active
        ? "bg-coral text-white"
        : "bg-coral-light text-coral-dark"
      : active
        ? "bg-sage-500 text-white"
        : "bg-white text-sage-700 border border-sage-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[base, styles, onClick ? "cursor-pointer" : "cursor-default", className].join(" ")}
    >
      {children}
    </button>
  );
}
