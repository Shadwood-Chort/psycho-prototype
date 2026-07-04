import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MonthCalendar } from "../../components/calendar/MonthCalendar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { availableTimeOnLabel, bookingWithLabel } from "../../i18n/translations";
import { formatDateHuman } from "../../utils/format";

export function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const rescheduleId = searchParams.get("reschedule");
  const navigate = useNavigate();
  const { addAppointment, rescheduleAppointment, questionnaire, language } = useApp();
  const t = useT();

  const psychologist = PSYCHOLOGISTS.find((p) => p.id === id);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestText, setSuggestText] = useState("");

  if (!psychologist) {
    return (
      <div className="flex min-h-full flex-col">
        <TopBar title={t("Не найдено")} />
      </div>
    );
  }

  const p = psychologist;
  const slotsForDate = selectedDate ? (p.availableDates[selectedDate] ?? []) : [];

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

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    const format = questionnaire.format === "offline" ? "offline" : "online";
    if (rescheduleId) {
      rescheduleAppointment(rescheduleId, selectedDate, selectedTime);
      navigate("/client/appointments");
    } else {
      const appt = addAppointment(p.id, selectedDate, selectedTime, format);
      navigate(`/client/booking-confirmed/${appt.id}`);
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={rescheduleId ? t("Перенос записи") : bookingWithLabel(language, p.name)} />

      <div className="flex-1 px-5 pb-4">
        <Card className="mb-4">
          <MonthCalendar
            year={viewYear}
            month={viewMonth}
            onPrevMonth={() => changeMonth(-1)}
            onNextMonth={() => changeMonth(1)}
            selectedDate={selectedDate}
            onSelectDate={(key) => {
              setSelectedDate(key);
              setSelectedTime(null);
            }}
            dayStatus={(key) => (p.availableDates[key] ? "available" : undefined)}
          />
        </Card>

        <div className="mb-4 flex items-center justify-center gap-1.5 text-[11px] text-sage-500">
          <span className="h-3 w-3 rounded-full bg-sage-100 ring-1 ring-inset ring-sage-300" />
          <span>{t("Есть свободное время")}</span>
        </div>

        {selectedDate && (
          <div className="mb-4">
            <h2 className="mb-2 text-[13px] font-medium text-sage-700">
              {availableTimeOnLabel(language, formatDateHuman(selectedDate))}
            </h2>
            {slotsForDate.length === 0 ? (
              <p className="text-[13px] text-sage-500">
                {t("На эту дату нет свободных слотов. Выберите другой день.")}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {slotsForDate.map((time) => (
                  <Chip key={time} active={selectedTime === time} onClick={() => setSelectedTime(time)}>
                    {time}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setShowSuggest((v) => !v)}
          className="mb-2 w-full rounded-xl border border-dashed border-sage-300 bg-white py-3 text-[13px] font-medium text-sage-600"
        >
          {t("Предложите мне время")}
        </button>
        {showSuggest && (
          <Card className="mb-4 space-y-2">
            <p className="text-[12px] text-sage-500">
              {t("Опишите, когда вам удобно — специалист свяжется с вами для согласования.")}
            </p>
            <textarea
              value={suggestText}
              onChange={(e) => setSuggestText(e.target.value)}
              rows={2}
              placeholder="Например: по вторникам после 18:00"
              className="w-full resize-none rounded-xl border border-sage-200 p-2.5 text-[13px] focus:border-sage-400 focus:outline-none"
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowSuggest(false)}
              disabled={!suggestText.trim()}
            >
              {t("Отправить предложение")}
            </Button>
          </Card>
        )}

        <p className="text-center text-[12px] text-sage-400">
          {t("Время указано по часовому поясу Ташкент, GMT+5")}
        </p>
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button disabled={!selectedDate || !selectedTime} onClick={handleConfirm}>
          {t("Подтвердить запись")}
        </Button>
      </div>
    </div>
  );
}
