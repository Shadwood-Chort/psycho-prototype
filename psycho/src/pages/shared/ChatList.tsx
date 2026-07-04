import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";

export function ChatList() {
  const location = useLocation();
  const isPsychologist = location.pathname.startsWith("/psychologist");
  const navigate = useNavigate();
  const { appointments, favorites, chats } = useApp();
  const t = useT();

  if (isPsychologist) {
    const myAppointments = appointments.filter((a) => a.psychologistId === MY_PSYCHOLOGIST_ID);
    return (
      <div className="flex min-h-full flex-col">
        <div className="px-5 pt-6 pb-3">
          <h1 className="text-xl font-semibold text-sage-900">{t("Чаты с клиентами")}</h1>
        </div>
        <div className="flex-1 px-5 pb-6">
          {myAppointments.length === 0 ? (
            <EmptyState text={t("Пока нет активных чатов с клиентами.")} />
          ) : (
            <div className="space-y-2">
              {myAppointments.map((a) => {
                const thread = chats[a.id];
                const last = thread?.[thread.length - 1];
                return (
                  <button
                    key={a.id}
                    onClick={() => navigate(`/psychologist/chats/${a.id}`)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[var(--shadow-soft)]"
                  >
                    <Avatar initials={initialsOf(a.clientName)} color="#AEC7A7" size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-sage-900">
                        {a.clientName}
                      </p>
                      <p className="truncate text-[12px] text-sage-500">
                        {last ? last.text : t("Нажмите, чтобы начать диалог")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const relatedIds = Array.from(
    new Set([
      ...appointments
        .filter((a) => a.psychologistId !== MY_PSYCHOLOGIST_ID)
        .map((a) => a.psychologistId),
      ...favorites,
    ]),
  );
  const relatedPsychologists = PSYCHOLOGISTS.filter((p) => relatedIds.includes(p.id));

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-semibold text-sage-900">{t("Чаты")}</h1>
      </div>
      <div className="flex-1 px-5 pb-6">
        {relatedPsychologists.length === 0 ? (
          <EmptyState text={t("У вас пока нет чатов. Запишитесь на консультацию, чтобы начать общение.")} />
        ) : (
          <div className="space-y-2">
            {relatedPsychologists.map((p) => {
              const thread = chats[p.id];
              const last = thread?.[thread.length - 1];
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/client/chats/${p.id}`)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[var(--shadow-soft)]"
                >
                  <Avatar initials={p.initials} color={p.avatarColor} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-sage-900">{p.name}</p>
                    <p className="truncate text-[12px] text-sage-500">
                      {last ? last.text : t("Нажмите, чтобы начать диалог")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function EmptyState({ text }: { text: string }) {
  return <p className="pt-10 text-center text-[14px] text-sage-500">{text}</p>;
}
