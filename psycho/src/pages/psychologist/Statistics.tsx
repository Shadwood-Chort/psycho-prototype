import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { TopBar } from "../../components/ui/TopBar";

export function Statistics() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Статистика" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="text-4xl">📊</span>
        <p className="mt-3 text-[14px] font-medium text-sage-800">
          Расширенная аналитика по вашим сессиям и клиентам
        </p>
        <p className="mt-1 text-[12px] text-sage-500">Доступно на тарифе Premium для психологов.</p>
        <Button className="mt-5" onClick={() => navigate("/premium/psychologist")}>
          Узнать про Premium
        </Button>
      </div>
    </div>
  );
}
