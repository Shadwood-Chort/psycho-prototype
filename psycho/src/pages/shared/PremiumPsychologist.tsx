import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";

const FEATURES = [
  { icon: "🗓️", title: "Умный календарь и напоминания", text: "Автоматические напоминания клиентам и синхронизация расписания." },
  { icon: "🏆", title: "Выход в ТОП и бейдж «Проверенный специалист»", text: "Ваш профиль показывается выше в поиске." },
  { icon: "📝", title: "Публикация статей, видео и блога", text: "Делитесь экспертностью и привлекайте новых клиентов." },
  { icon: "📚", title: "Библиотека техник и шаблонов", text: "Готовые материалы для работы с клиентами." },
  { icon: "📊", title: "Расширенная аналитика", text: "Статистика по сессиям, доходу и клиентам." },
];

export function PremiumPsychologist() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Premium для психологов" />
      <div className="flex-1 space-y-3 px-5 pb-4">
        <div className="rounded-2xl bg-sage-500 p-4 text-white">
          <p className="text-[15px] font-semibold">PRO-подписка</p>
          <p className="text-[12px] text-sage-100">Развивайте практику быстрее с расширенными инструментами</p>
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
        <Button onClick={() => navigate("/payment")}>Подробнее о Premium</Button>
      </div>
    </div>
  );
}
