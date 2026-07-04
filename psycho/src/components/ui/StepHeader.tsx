import { useApp } from "../../context/AppContext";
import { stepOfLabel } from "../../i18n/translations";

interface StepHeaderProps {
  step: number;
  total: number;
  title: string;
  onBack?: () => void;
}

export function StepHeader({ step, total, title, onBack }: StepHeaderProps) {
  const { language } = useApp();
  return (
    <div className="px-5 pt-6 pb-2">
      <div className="flex items-center gap-3 mb-3">
        {onBack && (
          <button
            type="button"
            aria-label="Назад"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sage-700 shadow-[var(--shadow-soft)] shrink-0"
          >
            ←
          </button>
        )}
        <span className="text-[13px] font-medium text-sage-500">
          {stepOfLabel(language, step, total)}
        </span>
      </div>
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={[
              "h-1.5 flex-1 rounded-full",
              i < step ? "bg-sage-500" : "bg-sage-100",
            ].join(" ")}
          />
        ))}
      </div>
      <h1 className="text-xl font-semibold text-sage-900">{title}</h1>
    </div>
  );
}
