import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";
import { formatDateHuman } from "../../utils/format";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useApp();
  const appt = appointments.find((a) => a.id === id);
  const t = useT();

  if (!appt) {
    return (
      <div className="flex min-h-full flex-col">
        <TopBar title={t("Запись не найдена")} />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Запись клиента")} />

      <div className="flex-1 space-y-4 px-5 pb-6">
        <Card>
          <div className="flex items-center gap-3">
            <Avatar initials={initialsOf(appt.clientName)} color="#AEC7A7" size={52} />
            <div>
              <p className="text-[15px] font-semibold text-sage-900">{appt.clientName}</p>
              <p className="text-[12px] text-sage-500">
                {formatDateHuman(appt.date)} в {appt.time}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-[12px]">
            <span className="rounded-full bg-sage-50 px-2.5 py-1 text-sage-600">
              {appt.format === "online" ? t("Онлайн") : t("Офлайн")}
            </span>
            <span className="rounded-full bg-sage-50 px-2.5 py-1 text-sage-600">
              {appt.status === "upcoming"
                ? t("Предстоит")
                : appt.status === "cancelled"
                  ? t("Отменена")
                  : t("Завершена")}
            </span>
          </div>
        </Card>

        <div>
          <h2 className="mb-2 text-[14px] font-semibold text-sage-900">{t("Анкета клиента")}</h2>
          <Card>
            <p className="text-[13px] leading-relaxed text-sage-700">
              {appt.clientRequestSummary ??
                t("Клиент не оставил дополнительной информации о своём запросе.")}
            </p>
          </Card>
        </div>

        {appt.status === "upcoming" && (
          <div className="space-y-2.5">
            <Button onClick={() => alert("Запись подтверждена (демо)")}>{t("Подтвердить запись")}</Button>
            <Button variant="secondary" onClick={() => navigate(`/psychologist/chats/${appt.id}`)}>
              {t("Обсудить детали в чате")}
            </Button>
            <Button
              variant="coral"
              onClick={() => {
                cancelAppointment(appt.id);
                navigate("/psychologist/appointments");
              }}
            >
              {t("Отменить запись")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
