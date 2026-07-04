import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { formatDateHuman } from "../../utils/format";

export function ClientAppointments() {
  const { appointments, cancelAppointment } = useApp();
  const navigate = useNavigate();
  const t = useT();

  const STATUS_LABEL: Record<string, string> = {
    upcoming: t("Предстоит"),
    completed: t("Завершена"),
    cancelled: t("Отменена"),
  };

  const myAppointments = appointments
    .filter((a) => a.psychologistId !== MY_PSYCHOLOGIST_ID)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-semibold text-sage-900">{t("Мои записи")}</h1>
      </div>

      <div className="flex-1 space-y-3 px-5 pb-6">
        {myAppointments.length === 0 && (
          <p className="pt-10 text-center text-[14px] text-sage-500">
            {t("У вас пока нет записей. Найдите специалиста и запишитесь на консультацию.")}
          </p>
        )}
        {myAppointments.map((a) => {
          const p = PSYCHOLOGISTS.find((p) => p.id === a.psychologistId);
          if (!p) return null;
          return (
            <Card key={a.id}>
              <div className="flex items-center gap-3">
                <Avatar initials={p.initials} color={p.avatarColor} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-sage-900">{p.name}</p>
                  <p className="text-[12px] text-sage-500">
                    {formatDateHuman(a.date)} в {a.time}
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

              {a.status === "upcoming" && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <ActionButton label={t("Просмотр")} onClick={() => navigate(`/client/specialists/${p.id}`)} />
                  <ActionButton
                    label={t("Перенести")}
                    onClick={() => navigate(`/client/specialists/${p.id}/booking?reschedule=${a.id}`)}
                  />
                  <ActionButton label={t("Отменить")} onClick={() => cancelAppointment(a.id)} danger />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  danger,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-lg py-2 text-[11px] font-medium",
        danger ? "bg-coral-light text-coral-dark" : "bg-sage-50 text-sage-700",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
