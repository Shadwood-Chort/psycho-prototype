import { useApp } from "../../context/AppContext";
import { monthNames, weekdayShortNames } from "../../i18n/translations";
import { dateKeyFromDate } from "../../utils/format";

export type DayStatus = "available" | "busy" | "partial" | undefined;

interface MonthCalendarProps {
  year: number;
  month: number; // 0-11
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedDate: string | null;
  onSelectDate: (dateKey: string) => void;
  dayStatus?: (dateKey: string) => DayStatus;
  minDate?: Date;
}

const STATUS_STYLE: Record<Exclude<DayStatus, undefined>, string> = {
  available: "bg-sage-100 text-sage-800 font-semibold ring-1 ring-inset ring-sage-300",
  busy: "bg-coral-light text-coral-dark font-semibold",
  partial: "bg-peach-light text-peach-dark font-semibold",
};

export function MonthCalendar({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  dayStatus,
  minDate,
}: MonthCalendarProps) {
  const { language } = useApp();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const min = minDate ?? new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={onPrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sage-600 shadow-[var(--shadow-soft)]"
          aria-label="Предыдущий месяц"
        >
          ‹
        </button>
        <span className="text-[14px] font-semibold text-sage-900">
          {monthNames(language)[month]} {year}
        </span>
        <button
          onClick={onNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sage-600 shadow-[var(--shadow-soft)]"
          aria-label="Следующий месяц"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] text-sage-400">
        {weekdayShortNames(language).map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const key = dateKeyFromDate(date);
          const disabled = date < min;
          const status = dayStatus?.(key);
          const isSelected = selectedDate === key;
          return (
            <button
              key={key}
              disabled={disabled}
              onClick={() => onSelectDate(key)}
              className="flex items-center justify-center py-0.5"
            >
              <span
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition-colors",
                  disabled
                    ? "text-sage-200"
                    : isSelected
                      ? "bg-sage-500 text-white font-semibold"
                      : status
                        ? STATUS_STYLE[status]
                        : "text-sage-300",
                ].join(" ")}
              >
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
