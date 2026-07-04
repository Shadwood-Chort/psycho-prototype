import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MonthCalendar, type DayStatus } from "../../components/calendar/MonthCalendar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";
import { formatDateHuman } from "../../utils/format";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function PsychologistCalendar() {
  const { psychReg, appointments } = useApp();
  const navigate = useNavigate();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const statusFor = (dateKey: string): DayStatus => {
    const [y, m, d] = dateKey.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const weekday = WEEKDAYS[(date.getDay() + 6) % 7];
    const totalSlots = psychReg.weeklySlots[weekday]?.length ?? 0;
    if (totalSlots === 0) return undefined;
    const booked = appointments.filter(
      (a) =>
        a.psychologistId === MY_PSYCHOLOGIST_ID && a.date === dateKey && a.status === "upcoming",
    ).length;
    if (booked === 0) return "available";
    if (booked >= totalSlots) return "busy";
    return "partial";
  };

  const selectedAppointments = selectedDate
    ? appointments.filter(
        (a) =>
          a.psychologistId === MY_PSYCHOLOGIST_ID &&
          a.date === selectedDate &&
          a.status === "upcoming",
      )
    : [];

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Календарь" />

      <div className="flex-1 px-5 pb-4">
        <Card className="mb-4">
          <MonthCalendar
            year={viewYear}
            month={viewMonth}
            onPrevMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            dayStatus={statusFor}
          />
        </Card>

        <div className="mb-4 flex items-center justify-center gap-4 text-[11px] text-sage-600">
          <Legend color="bg-sage-500" label="Свободно" />
          <Legend color="bg-peach-dark" label="Частично занято" />
          <Legend color="bg-coral" label="Занято" />
        </div>

        {selectedDate && (
          <div className="mb-4">
            <h2 className="mb-2 text-[13px] font-medium text-sage-700">
              Записи на {formatDateHuman(selectedDate)}
            </h2>
            {selectedAppointments.length === 0 ? (
              <p className="text-[13px] text-sage-500">Нет записей на эту дату.</p>
            ) : (
              <div className="space-y-2">
                {selectedAppointments.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-[var(--shadow-soft)]"
                  >
                    <span className="text-[13px] font-medium text-sage-800">{a.clientName}</span>
                    <span className="text-[13px] text-sage-500">{a.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button variant="secondary" onClick={() => navigate("/psychologist/schedule")}>
          Настроить расписание
        </Button>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={["h-2 w-2 rounded-full", color].join(" ")} />
      {label}
    </span>
  );
}
