import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { StepHeader } from "../../components/ui/StepHeader";
import { useApp } from "../../context/AppContext";
import { LANGUAGES, TOPICS } from "../../data/mock";

export function ClientRegister() {
  const [step, setStep] = useState(1);
  const { questionnaire, updateQuestionnaire } = useApp();
  const navigate = useNavigate();

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
            ? "С чем вы хотите обратиться?"
            : step === 2
              ? "Расскажите немного о себе"
              : "Проверьте свои ответы"
        }
      />

      <div className="flex-1 px-5 pb-4">
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button onClick={next}>{step < 3 ? "Далее" : "Продолжить поиск"}</Button>
      </div>
    </div>
  );

  function StepOne() {
    return (
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-sage-700">
            Опишите свободно, с чем вы хотите обратиться
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
            Что вас беспокоит больше всего?
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <Chip
                key={t}
                active={questionnaire.concerns.includes(t)}
                onClick={() =>
                  updateQuestionnaire({
                    concerns: questionnaire.concerns.includes(t)
                      ? questionnaire.concerns.filter((c) => c !== t)
                      : [...questionnaire.concerns, t],
                  })
                }
              >
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function StepTwo() {
    return (
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-sage-700">
            Ваш опыт терапии
          </label>
          <div className="space-y-2">
            {[
              { v: "none", label: "Без опыта" },
              { v: "some", label: "Был(а) опыт" },
              { v: "regular", label: "Регулярно хожу" },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => updateQuestionnaire({ experience: o.v as any })}
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
            Язык консультации
          </label>
          <select
            value={questionnaire.language}
            onChange={(e) => updateQuestionnaire({ language: e.target.value })}
            className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-[14px] text-sage-800 focus:border-sage-400 focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-sage-700">Формат</label>
          <div className="flex gap-2">
            {[
              { v: "online", label: "Онлайн" },
              { v: "offline", label: "Офлайн" },
              { v: "any", label: "Неважно" },
            ].map((o) => (
              <Chip
                key={o.v}
                active={questionnaire.format === o.v}
                onClick={() => updateQuestionnaire({ format: o.v as any })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-sage-700">
            Предпочитаемый пол специалиста
          </label>
          <div className="flex gap-2">
            {[
              { v: "any", label: "Неважно" },
              { v: "female", label: "Женщина" },
              { v: "male", label: "Мужчина" },
            ].map((o) => (
              <Chip
                key={o.v}
                active={questionnaire.specialistGender === o.v}
                onClick={() => updateQuestionnaire({ specialistGender: o.v as any })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium text-sage-700">
            Как к вам обращаться?
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

  function StepThree() {
    const rows: [string, string][] = [
      ["Запрос", questionnaire.request || "—"],
      ["Беспокоит", questionnaire.concerns.join(", ") || "—"],
      [
        "Опыт терапии",
        questionnaire.experience === "none"
          ? "Без опыта"
          : questionnaire.experience === "some"
            ? "Был(а) опыт"
            : questionnaire.experience === "regular"
              ? "Регулярно хожу"
              : "—",
      ],
      ["Язык", questionnaire.language],
      [
        "Формат",
        questionnaire.format === "online" ? "Онлайн" : questionnaire.format === "offline" ? "Офлайн" : "Неважно",
      ],
      [
        "Пол специалиста",
        questionnaire.specialistGender === "any"
          ? "Неважно"
          : questionnaire.specialistGender === "female"
            ? "Женщина"
            : "Мужчина",
      ],
      ["Обращение", questionnaire.addressAs || "—"],
    ];
    return (
      <div className="space-y-3">
        <p className="text-[13px] text-sage-600">
          Проверьте, всё ли верно. Эти данные помогут подобрать подходящего специалиста и будут
          доступны психологу перед сессией.
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
}
