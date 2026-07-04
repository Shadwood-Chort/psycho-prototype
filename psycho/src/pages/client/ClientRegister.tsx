import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { StepHeader } from "../../components/ui/StepHeader";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";
import { LANGUAGES, TOPICS } from "../../data/mock";
import type { ClientQuestionnaire } from "../../types";

interface StepProps {
  questionnaire: ClientQuestionnaire;
  updateQuestionnaire: (patch: Partial<ClientQuestionnaire>) => void;
}

export function ClientRegister() {
  const [step, setStep] = useState(1);
  const { questionnaire, updateQuestionnaire } = useApp();
  const navigate = useNavigate();
  const t = useT();

  const back = () => {
    if (step === 1) navigate("/");
    else setStep((s) => s - 1);
  };

  const next = () => {
    if (step < 3) setStep((s) => s + 1);
    else navigate("/client/search");
  };

  return (
    <div className="flex min-h-full flex-col">
      <StepHeader
        step={step}
        total={3}
        onBack={back}
        title={
          step === 1
            ? t("С чем вы хотите обратиться?")
            : step === 2
              ? t("Расскажите немного о себе")
              : t("Проверьте свои ответы")
        }
      />

      <div className="flex-1 px-5 pb-4">
        {step === 1 && (
          <StepOne questionnaire={questionnaire} updateQuestionnaire={updateQuestionnaire} />
        )}
        {step === 2 && (
          <StepTwo questionnaire={questionnaire} updateQuestionnaire={updateQuestionnaire} />
        )}
        {step === 3 && <StepThree questionnaire={questionnaire} />}
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button onClick={next}>{step < 3 ? t("Далее") : t("Продолжить поиск")}</Button>
      </div>
    </div>
  );
}

function StepOne({ questionnaire, updateQuestionnaire }: StepProps) {
  const t = useT();
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Опишите свободно, с чем вы хотите обратиться")}
        </label>
        <textarea
          value={questionnaire.request}
          onChange={(e) => updateQuestionnaire({ request: e.target.value })}
          rows={4}
          placeholder="Например: в последнее время я стал(а) чаще тревожиться..."
          className="w-full resize-none rounded-2xl border border-sage-200 bg-white p-3.5 text-[14px] text-sage-800 placeholder:text-sage-400 focus:border-sage-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Что вас беспокоит больше всего?")}
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <Chip
              key={topic}
              active={questionnaire.concerns.includes(topic)}
              onClick={() =>
                updateQuestionnaire({
                  concerns: questionnaire.concerns.includes(topic)
                    ? questionnaire.concerns.filter((c) => c !== topic)
                    : [...questionnaire.concerns, topic],
                })
              }
            >
              {t(topic)}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepTwo({ questionnaire, updateQuestionnaire }: StepProps) {
  const t = useT();
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Ваш опыт терапии")}
        </label>
        <div className="space-y-2">
          {[
            { v: "none", label: t("Без опыта") },
            { v: "some", label: t("Был(а) опыт") },
            { v: "regular", label: t("Регулярно хожу") },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => updateQuestionnaire({ experience: o.v as ClientQuestionnaire["experience"] })}
              className={[
                "w-full rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-colors",
                questionnaire.experience === o.v
                  ? "border-sage-500 bg-sage-50 text-sage-800"
                  : "border-sage-200 bg-white text-sage-700",
              ].join(" ")}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Язык консультации")}
        </label>
        <select
          value={questionnaire.language}
          onChange={(e) => updateQuestionnaire({ language: e.target.value })}
          className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-[14px] text-sage-800 focus:border-sage-400 focus:outline-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {t(l)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">{t("Формат")}</label>
        <div className="flex gap-2">
          {[
            { v: "online", label: t("Онлайн") },
            { v: "offline", label: t("Офлайн") },
            { v: "any", label: t("Неважно") },
          ].map((o) => (
            <Chip
              key={o.v}
              active={questionnaire.format === o.v}
              onClick={() => updateQuestionnaire({ format: o.v as ClientQuestionnaire["format"] })}
            >
              {o.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Предпочитаемый пол специалиста")}
        </label>
        <div className="flex gap-2">
          {[
            { v: "any", label: t("Неважно") },
            { v: "female", label: t("Женщина") },
            { v: "male", label: t("Мужчина") },
          ].map((o) => (
            <Chip
              key={o.v}
              active={questionnaire.specialistGender === o.v}
              onClick={() =>
                updateQuestionnaire({ specialistGender: o.v as ClientQuestionnaire["specialistGender"] })
              }
            >
              {o.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium text-sage-700">
          {t("Как к вам обращаться?")}
        </label>
        <input
          value={questionnaire.addressAs}
          onChange={(e) => updateQuestionnaire({ addressAs: e.target.value })}
          placeholder="Ваше имя"
          className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-[14px] text-sage-800 placeholder:text-sage-400 focus:border-sage-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

function StepThree({ questionnaire }: { questionnaire: ClientQuestionnaire }) {
  const t = useT();
  const rows: [string, string][] = [
    [t("Запрос"), questionnaire.request || "—"],
    [t("Беспокоит"), questionnaire.concerns.map(t).join(", ") || "—"],
    [
      t("Опыт терапии"),
      questionnaire.experience === "none"
        ? t("Без опыта")
        : questionnaire.experience === "some"
          ? t("Был(а) опыт")
          : questionnaire.experience === "regular"
            ? t("Регулярно хожу")
            : "—",
    ],
    [t("Язык"), t(questionnaire.language)],
    [
      t("Формат"),
      questionnaire.format === "online"
        ? t("Онлайн")
        : questionnaire.format === "offline"
          ? t("Офлайн")
          : t("Неважно"),
    ],
    [
      t("Пол специалиста"),
      questionnaire.specialistGender === "any"
        ? t("Неважно")
        : questionnaire.specialistGender === "female"
          ? t("Женщина")
          : t("Мужчина"),
    ],
    [t("Обращение"), questionnaire.addressAs || "—"],
  ];
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-sage-600">
        {t(
          "Проверьте, всё ли верно. Эти данные помогут подобрать подходящего специалиста и будут доступны психологу перед сессией.",
        )}
      </p>
      <div className="divide-y divide-sage-100 rounded-2xl bg-white shadow-[var(--shadow-soft)]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-3 text-[13px]">
            <span className="text-sage-500">{label}</span>
            <span className="max-w-[60%] text-right font-medium text-sage-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
