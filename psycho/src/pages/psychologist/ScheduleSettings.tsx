import { TopBar } from "../../components/ui/TopBar";
import { Chip } from "../../components/ui/Chip";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const TIME_OPTIONS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

export function ScheduleSettings() {
  const { psychReg, updatePsychReg } = useApp();
  const t = useT();

  const toggleWeekday = (day: string) => {
    updatePsychReg({
      weeklySlots: psychReg.weeklySlots[day]
        ? Object.fromEntries(Object.entries(psychReg.weeklySlots).filter(([d]) => d !== day))
        : { ...psychReg.weeklySlots, [day]: [] },
    });
  };

  const toggleTime = (day: string, time: string) => {
    const current = psychReg.weeklySlots[day] ?? [];
    updatePsychReg({
      weeklySlots: {
        ...psychReg.weeklySlots,
        [day]: current.includes(time) ? current.filter((t) => t !== time) : [...current, time],
      },
    });
  };

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Настройка расписания")} />
      <div className="flex-1 space-y-3 px-5 pb-6">
        <p className="text-[13px] text-sage-600">
          {t(
            "Отметьте дни недели и удобное время для консультаций. Изменения сразу отразятся в календаре.",
          )}
        </p>
        {WEEKDAYS.map((day) => {
          const active = day in psychReg.weeklySlots;
          return (
            <div key={day} className="rounded-xl bg-white p-3 shadow-[var(--shadow-soft)]">
              <button
                onClick={() => toggleWeekday(day)}
                className="flex w-full items-center justify-between"
              >
                <span className="text-[14px] font-medium text-sage-800">{day}</span>
                <span
                  className={[
                    "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
                    active ? "bg-sage-500 justify-end" : "bg-sage-100 justify-start",
                  ].join(" ")}
                >
                  <span className="h-4 w-4 rounded-full bg-white" />
                </span>
              </button>
              {active && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {TIME_OPTIONS.map((t) => (
                    <Chip
                      key={t}
                      active={psychReg.weeklySlots[day]?.includes(t)}
                      onClick={() => toggleTime(day, t)}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
