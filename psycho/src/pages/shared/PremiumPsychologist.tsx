import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useT } from "../../i18n/useT";

export function PremiumPsychologist() {
  const navigate = useNavigate();
  const t = useT();

  const FEATURES = [
    {
      icon: "🗓️",
      title: t("Умный календарь и напоминания"),
      text: t("Автоматические напоминания клиентам и синхронизация расписания."),
    },
    {
      icon: "🏆",
      title: t("Выход в ТОП и бейдж «Проверенный специалист»"),
      text: t("Ваш профиль показывается выше в поиске."),
    },
    {
      icon: "📝",
      title: t("Публикация статей, видео и блога"),
      text: t("Делитесь экспертностью и привлекайте новых клиентов."),
    },
    {
      icon: "📚",
      title: t("Библиотека техник и шаблонов"),
      text: t("Готовые материалы для работы с клиентами."),
    },
    {
      icon: "📊",
      title: t("Расширенная аналитика"),
      text: t("Статистика по сессиям, доходу и клиентам."),
    },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Premium для психологов")} />
      <div className="flex-1 space-y-3 px-5 pb-4">
        <div className="rounded-2xl bg-sage-500 p-4 text-white">
          <p className="text-[15px] font-semibold">{t("PRO-подписка")}</p>
          <p className="text-[12px] text-sage-100">
            {t("Развивайте практику быстрее с расширенными инструментами")}
          </p>
        </div>
        {FEATURES.map((f) => (
          <Card key={f.title} className="flex gap-3">
            <span className="text-2xl">{f.icon}</span>
            <div>
              <p className="text-[13px] font-semibold text-sage-900">{f.title}</p>
              <p className="mt-0.5 text-[12px] text-sage-600">{f.text}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="space-y-2 px-5 pb-6 pt-2">
        <Button onClick={() => navigate("/payment")}>{t("Подробнее о Premium")}</Button>
      </div>
    </div>
  );
}
