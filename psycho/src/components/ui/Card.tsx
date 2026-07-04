import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={["rounded-2xl bg-white shadow-[var(--shadow-soft)] p-4", className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
