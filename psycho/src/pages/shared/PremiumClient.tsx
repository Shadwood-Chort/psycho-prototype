import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useT } from "../../i18n/useT";

export function PremiumClient() {
  const navigate = useNavigate();
  const t = useT();

  const FEATURES = [
    { icon: "📓", title: t("Трекеры и дневники"), text: t("Отслеживайте настроение и прогресс между сессиями.") },
    { icon: "🤖", title: t("AI-ассистент 24/7"), text: t("Поддержка и советы в любое время суток.") },
    { icon: "🧘", title: t("Медитации и техники"), text: t("Библиотека практик для самостоятельной работы.") },
    { icon: "🎓", title: t("Вебинары и мини-курсы"), text: t("Обучающие материалы от специалистов платформы.") },
    { icon: "⚡", title: t("Приоритетная запись"), text: t("Бронируйте слоты у популярных специалистов первыми.") },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Premium для клиентов")} />
      <div className="flex-1 space-y-3 px-5 pb-4">
        <div className="rounded-2xl bg-sage-500 p-4 text-white">
          <p className="text-[15px] font-semibold">{t("PRO-подписка")}</p>
          <p className="text-[12px] text-sage-100">{t("Больше инструментов для заботы о себе")}</p>
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
        <Button onClick={() => navigate("/payment")}>{t("Оформить Premium")}</Button>
      </div>
    </div>
  );
}
