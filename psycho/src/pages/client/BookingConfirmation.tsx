import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { formatDateHuman } from "../../utils/format";

export function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments } = useApp();
  const t = useT();

  const appt = appointments.find((a) => a.id === id);
  const psychologist = PSYCHOLOGISTS.find((p) => p.id === appt?.psychologistId);

  if (!appt || !psychologist) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[14px] text-sage-500">{t("Запись не найдена.")}</p>
        <Button className="mt-4" onClick={() => navigate("/client/search")}>
          {t("Вернуться к поиску")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-6 pt-14 text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sage-500 text-4xl text-white shadow-[var(--shadow-soft-lg)]">
        ✓
      </div>
      <h1 className="text-xl font-semibold text-sage-900">{t("Запись подтверждена!")}</h1>
      <p className="mt-2 text-[14px] text-sage-600">
        {formatDateHuman(appt.date)} в {appt.time}
      </p>

      <Card className="mt-6 text-left">
        <div className="flex items-center gap-3">
          <Avatar initials={psychologist.initials} color={psychologist.avatarColor} size={52} />
          <div>
            <p className="text-[14px] font-semibold text-sage-900">{psychologist.name}</p>
            <p className="text-[12px] text-sage-500">{psychologist.approaches.join(", ")}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-[12px] text-sage-600">
          <span>{appt.format === "online" ? t("Онлайн") : t("Офлайн")}</span>
          <span>Ташкент, GMT+5</span>
        </div>
      </Card>

      <p className="mt-4 text-[12px] text-sage-500">
        {t("Мы напомним вам о встрече за 24 часа и за 1 час до начала сессии.")}
      </p>

      <div className="mt-auto space-y-3 pt-8">
        <Button variant="secondary" onClick={() => alert("Событие добавлено в календарь (демо)")}>
          {t("Добавить в календарь")}
        </Button>
        <Button onClick={() => navigate(`/client/chats/${psychologist.id}`)}>
          {t("Перейти к чату")}
        </Button>
      </div>
    </div>
  );
}
