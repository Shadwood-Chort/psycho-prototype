import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { TopBar } from "../../components/ui/TopBar";
import { useT } from "../../i18n/useT";

export function Content() {
  const navigate = useNavigate();
  const t = useT();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Мои материалы")} />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="text-4xl">📚</span>
        <p className="mt-3 text-[14px] font-medium text-sage-800">
          {t("Добавить статью, запланировать вебинар и т.д.")}
        </p>
        <p className="mt-1 text-[12px] text-sage-500">
          {t("Публикация материалов доступна на тарифе Premium для психологов.")}
        </p>
        <Button className="mt-5" onClick={() => navigate("/premium/psychologist")}>
          {t("Узнать про Premium")}
        </Button>
      </div>
    </div>
  );
}
