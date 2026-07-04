import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useT } from "../../i18n/useT";

export function Payment() {
  const [paid, setPaid] = useState(false);
  const t = useT();

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Оплата")} />
      <div className="flex-1 space-y-4 px-5 pb-6">
        <Card>
          <p className="text-[13px] leading-relaxed text-sage-700">
            {t(
              "Оплата консультаций происходит напрямую специалисту, вне платформы — мы не берём комиссию с сессий. Через платформу оплачивается только подписка",
            )}{" "}
            <span className="font-semibold">Premium</span>.
          </p>
        </Card>

        <Card className="text-center">
          <p className="text-[14px] font-semibold text-sage-900">{t("Premium-подписка")}</p>
          <p className="mt-1 text-[24px] font-bold text-sage-800">99 000 сум / мес.</p>
          {paid ? (
            <p className="mt-4 rounded-xl bg-sage-50 py-3 text-[13px] font-medium text-sage-700">
              {t("✓ Оплачено через Rahmat")}
            </p>
          ) : (
            <Button className="mt-4" onClick={() => setPaid(true)}>
              {t("Оплатить через Rahmat")}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
