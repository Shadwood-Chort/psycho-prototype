import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { sessionInfoLabel } from "../../i18n/translations";
import { formatDateHuman } from "../../utils/format";

export function ChatThread() {
  const { id } = useParams();
  const location = useLocation();
  const isPsychologist = location.pathname.startsWith("/psychologist");
  const { chats, addChatMessage, appointments, language } = useApp();
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const t = useT();

  let title = "";
  let subtitle = "";
  let avatarInitials = "";
  let avatarColor = "#8FA98F";
  let chatId = id ?? "";
  let sessionInfo: string | null = null;

  if (isPsychologist) {
    const appt = appointments.find((a) => a.id === id);
    title = appt?.clientName ?? t("Клиент");
    avatarInitials = title
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    if (appt) {
      sessionInfo = sessionInfoLabel(
        language,
        `${formatDateHuman(appt.date)} в ${appt.time}`,
        appt.format === "online" ? t("Zoom (ссылка появится за час до сессии)") : t("Офлайн"),
      );
    }
  } else {
    const p = PSYCHOLOGISTS.find((p) => p.id === id);
    title = p?.name ?? t("Специалист");
    avatarInitials = p?.initials ?? "??";
    avatarColor = p?.avatarColor ?? avatarColor;
    subtitle = p?.approaches.map(t).join(", ") ?? "";
    const appt = appointments.find(
      (a) => a.psychologistId === id && a.status === "upcoming",
    );
    if (appt) {
      sessionInfo = sessionInfoLabel(
        language,
        `${formatDateHuman(appt.date)} в ${appt.time}`,
        p?.contacts.zoom ? t("Zoom-ссылка активна за 1 час до начала") : t("Формат уточняется"),
      );
    }
  }

  const messages = chats[chatId] ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const send = () => {
    if (!text.trim()) return;
    addChatMessage(chatId, isPsychologist ? "psychologist" : "client", text.trim());
    setText("");
  };

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        title={title}
        right={
          <Avatar initials={avatarInitials} color={avatarColor} size={32} />
        }
      />
      {subtitle && <p className="-mt-1 px-5 pb-2 text-[12px] text-sage-500">{subtitle}</p>}

      {sessionInfo && (
        <div className="mx-5 mb-3 rounded-xl bg-sage-50 px-3 py-2 text-[12px] text-sage-700">
          {sessionInfo}
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-3">
        {messages.length === 0 && (
          <p className="pt-10 text-center text-[13px] text-sage-400">
            {t("Здесь пока нет сообщений. Начните диалог!")}
          </p>
        )}
        {messages.map((m) => {
          const mine = isPsychologist ? m.sender === "psychologist" : m.sender === "client";
          return (
            <div key={m.id} className={mine ? "flex justify-end" : "flex justify-start"}>
              <div
                className={[
                  "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px]",
                  mine ? "bg-sage-500 text-white" : "bg-white text-sage-800 shadow-[var(--shadow-soft)]",
                ].join(" ")}
              >
                {m.attachment && (
                  <div
                    className={[
                      "mb-1.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px]",
                      mine ? "bg-sage-600" : "bg-sage-50 text-sage-700",
                    ].join(" ")}
                  >
                    📎 {m.attachment}
                  </div>
                )}
                <p>{m.text}</p>
                <p className={["mt-1 text-[10px]", mine ? "text-sage-100" : "text-sage-400"].join(" ")}>
                  {m.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-sage-100 px-4 py-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={t("Написать сообщение...")}
          className="flex-1 rounded-full border border-sage-200 bg-white px-4 py-2.5 text-[13px] focus:border-sage-400 focus:outline-none"
        />
        <button
          onClick={send}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white"
          aria-label={t("Отправить")}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
