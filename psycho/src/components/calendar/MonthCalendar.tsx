import { MONTHS_RU_NOM, WEEKDAYS_RU_SHORT, dateKeyFromDate } from "../../utils/format";

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

const STATUS_DOT: Record<Exclude<DayStatus, undefined>, string> = {
  available: "bg-sage-500",
  busy: "bg-coral",
  partial: "bg-peach-dark",
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
          {MONTHS_RU_NOM[month]} {year}
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
        {WEEKDAYS_RU_SHORT.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
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
              className="flex flex-col items-center justify-center gap-0.5 py-1"
            >
              <span
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-[13px]",
                  disabled
                    ? "text-sage-200"
                    : isSelected
                      ? "bg-sage-500 text-white font-semibold"
                      : "text-sage-800",
                ].join(" ")}
              >
                {date.getDate()}
              </span>
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  status && !disabled ? STATUS_DOT[status] : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
