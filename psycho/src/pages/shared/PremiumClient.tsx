import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";

const FEATURES = [
  { icon: "📓", title: "Трекеры и дневники", text: "Отслеживайте настроение и прогресс между сессиями." },
  { icon: "🤖", title: "AI-ассистент 24/7", text: "Поддержка и советы в любое время суток." },
  { icon: "🧘", title: "Медитации и техники", text: "Библиотека практик для самостоятельной работы." },
  { icon: "🎓", title: "Вебинары и мини-курсы", text: "Обучающие материалы от специалистов платформы." },
  { icon: "⚡", title: "Приоритетная запись", text: "Бронируйте слоты у популярных специалистов первыми." },
];

export function PremiumClient() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Premium для клиентов" />
      <div className="flex-1 space-y-3 px-5 pb-4">
        <div className="rounded-2xl bg-sage-500 p-4 text-white">
          <p className="text-[15px] font-semibold">PRO-подписка</p>
          <p className="text-[12px] text-sage-100">Больше инструментов для заботы о себе</p>
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
        <Button onClick={() => navigate("/payment")}>Оформить Premium</Button>
      </div>
    </div>
  );
}
