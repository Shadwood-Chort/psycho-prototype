import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";
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

export function PsychologistAppointments() {
  const { appointments } = useApp();
  const navigate = useNavigate();
  const t = useT();

  const STATUS_LABEL: Record<string, string> = {
    upcoming: t("Предстоит"),
    completed: t("Завершена"),
    cancelled: t("Отменена"),
  };

  const mine = appointments
    .filter((a) => a.psychologistId === MY_PSYCHOLOGIST_ID)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Мои записи")} />
      <div className="flex-1 space-y-3 px-5 pb-6">
        {mine.length === 0 && (
          <p className="pt-10 text-center text-[14px] text-sage-500">
            {t("Пока нет записей клиентов.")}
          </p>
        )}
        {mine.map((a) => (
          <Card
            key={a.id}
            className="cursor-pointer"
            onClick={() => navigate(`/psychologist/appointments/${a.id}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar initials={initialsOf(a.clientName)} color="#AEC7A7" size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-sage-900">{a.clientName}</p>
                <p className="text-[12px] text-sage-500">
                  {formatDateHuman(a.date)} в {a.time} · {a.format === "online" ? t("Онлайн") : t("Офлайн")}
                </p>
              </div>
              <span
                className={[
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                  a.status === "upcoming"
                    ? "bg-sage-50 text-sage-600"
                    : a.status === "cancelled"
                      ? "bg-coral-light text-coral-dark"
                      : "bg-sage-100 text-sage-500",
                ].join(" ")}
              >
                {STATUS_LABEL[a.status]}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
