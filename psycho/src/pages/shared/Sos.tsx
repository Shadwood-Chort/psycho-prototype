import { TopBar } from "../../components/ui/TopBar";
import { HOTLINES } from "../../data/mock";
import { useT } from "../../i18n/useT";

export function Sos() {
  const t = useT();
  return (
    <div className="flex min-h-full flex-col bg-coral-light">
      <TopBar title="SOS" />

      <div className="flex-1 px-6 pb-8 pt-2 text-center">
        <p className="text-[15px] font-medium text-coral-dark">{t("Нужна помощь прямо сейчас?")}</p>
        <p className="mt-1 text-[13px] text-sage-700">
          {t("Вы не одни. Если вам тяжело — воспользуйтесь одной из линий поддержки ниже.")}
        </p>

        <a
          href="tel:1050"
          className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-coral text-lg font-bold text-white shadow-[var(--shadow-soft-lg)]"
        >
          SOS
        </a>

        <div className="mt-8 space-y-2 text-left">
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)]"
            >
              <span className="text-[13px] font-medium text-sage-800">{t(h.name)}</span>
              <span className="text-[14px] font-semibold text-coral">{h.number}</span>
            </a>
          ))}
        </div>

        <button
          onClick={() => alert("Открыт чат с поддержкой платформы (демо)")}
          className="mt-6 w-full rounded-full bg-sage-500 py-3.5 text-[15px] font-medium text-white"
        >
          {t("Написать в поддержку")}
        </button>
      </div>
    </div>
  );
}
