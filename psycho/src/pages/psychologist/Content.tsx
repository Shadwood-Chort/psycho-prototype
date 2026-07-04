import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { TopBar } from "../../components/ui/TopBar";

export function Content() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Мои материалы" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="text-4xl">📚</span>
        <p className="mt-3 text-[14px] font-medium text-sage-800">
          Добавить статью, запланировать вебинар и т.д.
        </p>
        <p className="mt-1 text-[12px] text-sage-500">
          Публикация материалов доступна на тарифе Premium для психологов.
        </p>
        <Button className="mt-5" onClick={() => navigate("/premium/psychologist")}>
          Узнать про Premium
        </Button>
      </div>
    </div>
  );
}
