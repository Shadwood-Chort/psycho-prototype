import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";
import { useT } from "../../i18n/useT";

export function Dashboard() {
  const { psychReg, psychProfileCompletion, appointments } = useApp();
  const navigate = useNavigate();
  const t = useT();

  const upcomingCount = appointments.filter(
    (a) => a.psychologistId === MY_PSYCHOLOGIST_ID && a.status === "upcoming",
  ).length;

  const initials =
    psychReg.fullName
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "Я";

  const menu = [
    { icon: "👤", label: t("Мой профиль"), to: "/psychologist/profile" },
    { icon: "📆", label: t("Календарь и расписание"), to: "/psychologist/calendar" },
    { icon: "📋", label: t("Мои записи"), to: "/psychologist/appointments", badge: upcomingCount },
    { icon: "🧑‍🤝‍🧑", label: t("Клиенты"), to: "/psychologist/clients" },
    { icon: "⭐", label: t("Отзывы"), to: "/psychologist/reviews" },
    { icon: "📚", label: t("Мои материалы"), to: "/psychologist/content", pro: true },
    { icon: "📊", label: t("Статистика"), to: "/psychologist/statistics", pro: true },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-sage-500 px-5 pb-6 pt-8 text-white">
        <div className="flex items-center gap-3">
          <Avatar initials={initials} color="#728C72" size={56} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-semibold">
              {psychReg.fullName || t("Ваше имя")}
            </p>
            <p className="text-[12px] text-sage-100">
              {psychReg.approaches.map(t).join(", ") || t("Укажите подходы в профиле")}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] text-sage-100">
            <span>{t("Профиль заполнен")}</span>
            <span>{psychProfileCompletion}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${psychProfileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 px-5 py-4">
        {menu.map((m) => (
          <button
            key={m.to}
            onClick={() => navigate(m.to)}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-[var(--shadow-soft)]"
          >
            <span className="text-xl">{m.icon}</span>
            <span className="flex-1 text-[14px] font-medium text-sage-800">{m.label}</span>
            {m.pro && (
              <span className="rounded-full bg-peach px-2 py-0.5 text-[10px] font-bold text-sage-800">
                PRO
              </span>
            )}
            {!!m.badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                {m.badge}
              </span>
            )}
            <span className="text-sage-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
