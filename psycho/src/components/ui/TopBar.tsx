import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
}

export function TopBar({ title, onBack, right }: TopBarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2 sticky top-0 z-10 bg-cream/95 backdrop-blur">
      <button
        type="button"
        aria-label="Назад"
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sage-700 shadow-[var(--shadow-soft)] shrink-0"
      >
        ←
      </button>
      {title && <h1 className="flex-1 truncate text-[17px] font-semibold text-sage-900">{title}</h1>}
      {right}
    </div>
  );
}
