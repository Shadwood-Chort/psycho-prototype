import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { StepHeader } from "../../components/ui/StepHeader";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";
import { APPROACHES, LANGUAGES, TOPICS } from "../../data/mock";
import type { PsychologistRegistration } from "../../types";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const TIME_OPTIONS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

export function PsychologistRegister() {
  const [step, setStep] = useState(1);
  const { psychReg, updatePsychReg } = useApp();
  const navigate = useNavigate();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const t = useT();

  const back = () => {
    if (step === 1) navigate("/");
    else setStep((s) => s - 1);
  };

  const next = () => {
    if (step < 5) setStep((s) => s + 1);
    else navigate("/psychologist/dashboard");
  };

  const toggleWeekday = (day: string) => {
    updatePsychReg({
      weeklySlots: psychReg.weeklySlots[day]
        ? Object.fromEntries(Object.entries(psychReg.weeklySlots).filter(([d]) => d !== day))
        : { ...psychReg.weeklySlots, [day]: [] },
    });
  };

  const toggleTime = (day: string, time: string) => {
    const current = psychReg.weeklySlots[day] ?? [];
    updatePsychReg({
      weeklySlots: {
        ...psychReg.weeklySlots,
        [day]: current.includes(time) ? current.filter((t) => t !== time) : [...current, time],
      },
    });
  };

  const titles = [
    t("Личная информация"),
    t("Квалификация"),
    t("Документы и верификация"),
    t("Настройка расписания"),
    t("Готово!"),
  ];

  return (
    <div className="flex min-h-full flex-col">
      <StepHeader step={Math.min(step, 5)} total={5} onBack={back} title={titles[step - 1]} />

      <div className="flex-1 px-5 pb-4">
        {step === 1 && (
          <div className="space-y-3">
            <TextField
              label={t("Полное имя")}
              value={psychReg.fullName}
              onChange={(v) => updatePsychReg({ fullName: v })}
              placeholder="Иванова Мария Сергеевна"
            />
            <TextField
              label="Email"
              value={psychReg.email}
              onChange={(v) => updatePsychReg({ email: v })}
              placeholder="mail@example.com"
            />
            <TextField
              label={t("Телефон")}
              value={psychReg.phone}
              onChange={(v) => updatePsychReg({ phone: v })}
              placeholder="+998 90 123 45 67"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-[13px] font-medium text-sage-700">
                {t("Специализация (темы)")}
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <Chip
                    key={topic}
                    active={psychReg.specializations.includes(topic)}
                    onClick={() =>
                      updatePsychReg({
                        specializations: psychReg.specializations.includes(topic)
                          ? psychReg.specializations.filter((x) => x !== topic)
                          : [...psychReg.specializations, topic],
                      })
                    }
                  >
                    {t(topic)}
                  </Chip>
                ))}
              </div>
            </div>

            <TextField
              label={t("Опыт работы (лет)")}
              value={psychReg.experienceYears}
              onChange={(v) => updatePsychReg({ experienceYears: v })}
              placeholder="5"
            />

            <div>
              <label className="mb-2 block text-[13px] font-medium text-sage-700">
                {t("Подходы и методы")}
              </label>
              <div className="flex flex-wrap gap-2">
                {APPROACHES.map((a) => (
                  <Chip
                    key={a}
                    active={psychReg.approaches.includes(a)}
                    onClick={() =>
                      updatePsychReg({
                        approaches: psychReg.approaches.includes(a)
                          ? psychReg.approaches.filter((x) => x !== a)
                          : [...psychReg.approaches, a],
                      })
                    }
                  >
                    {t(a)}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-sage-700">
                {t("Язык консультаций")}
              </label>
              <select
                value={psychReg.language}
                onChange={(e) => updatePsychReg({ language: e.target.value })}
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
              <label className="mb-2 block text-[13px] font-medium text-sage-700">
                {t("Предпочитаемый пол клиента")}
              </label>
              <div className="flex gap-2">
                {[
                  { v: "any", label: t("Неважно") },
                  { v: "female", label: t("Женщины") },
                  { v: "male", label: t("Мужчины") },
                ].map((o) => (
                  <Chip
                    key={o.v}
                    active={psychReg.clientGenderPreference === o.v}
                    onClick={() =>
                      updatePsychReg({
                        clientGenderPreference: o.v as PsychologistRegistration["clientGenderPreference"],
                      })
                    }
                  >
                    {o.label}
                  </Chip>
                ))}
              </div>
            </div>

            <TextField
              label={t("Цена за сессию (сум)")}
              value={psychReg.price}
              onChange={(v) => updatePsychReg({ price: v })}
              placeholder="180000"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-[13px] text-sage-600">
              {t("Загрузите диплом и сертификаты, подтверждающие квалификацию.")}
            </p>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sage-300 bg-white py-8 text-center">
              <span className="text-2xl">📄</span>
              <span className="text-[13px] font-medium text-sage-700">
                {t("Нажмите, чтобы загрузить файл")}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const name = e.target.files?.[0]?.name;
                  if (name) {
                    setFileNames((f) => [...f, name]);
                    updatePsychReg({ documents: [...psychReg.documents, name] });
                  }
                }}
              />
            </label>
            {fileNames.length > 0 && (
              <div className="space-y-2">
                {fileNames.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[13px] text-sage-700 shadow-[var(--shadow-soft)]"
                  >
                    📎 {f}
                  </div>
                ))}
              </div>
            )}
            <p className="rounded-xl bg-sage-50 px-3 py-2.5 text-[12px] text-sage-600">
              {t("Документы проходят модерацию. Обычно это занимает 1–2 рабочих дня.")}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-[13px] text-sage-600">
              {t("Отметьте дни недели и удобное время для консультаций.")}
            </p>
            <div className="space-y-3">
              {WEEKDAYS.map((day) => {
                const active = day in psychReg.weeklySlots;
                return (
                  <div key={day} className="rounded-xl bg-white p-3 shadow-[var(--shadow-soft)]">
                    <button
                      onClick={() => toggleWeekday(day)}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="text-[14px] font-medium text-sage-800">{day}</span>
                      <span
                        className={[
                          "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors",
                          active ? "bg-sage-500 justify-end" : "bg-sage-100 justify-start",
                        ].join(" ")}
                      >
                        <span className="h-4 w-4 rounded-full bg-white" />
                      </span>
                    </button>
                    {active && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {TIME_OPTIONS.map((time) => (
                          <Chip
                            key={time}
                            active={psychReg.weeklySlots[day]?.includes(time)}
                            onClick={() => toggleTime(day, time)}
                          >
                            {time}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <TextField
              label={t("Ссылка для онлайн-консультаций (Zoom)")}
              value={psychReg.onlineLink}
              onChange={(v) => updatePsychReg({ onlineLink: v })}
              placeholder="https://zoom.us/j/..."
            />
            <TextField
              label={t("Адрес для очных консультаций (необязательно)")}
              value={psychReg.officeAddress}
              onChange={(v) => updatePsychReg({ officeAddress: v })}
              placeholder="г. Ташкент, ул. ..."
            />
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center pt-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-sage-500 text-4xl text-white shadow-[var(--shadow-soft-lg)]">
              🎉
            </div>
            <h2 className="text-lg font-semibold text-sage-900">{t("Анкета отправлена!")}</h2>
            <p className="mt-2 text-[13px] text-sage-600">
              {t(
                "Мы проверим ваши документы и активируем профиль в течение 1–2 рабочих дней. А пока вы можете заполнить кабинет и настроить расписание.",
              )}
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button onClick={next}>{step < 5 ? t("Далее") : t("Перейти в кабинет")}</Button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-sage-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-[14px] text-sage-800 placeholder:text-sage-400 focus:border-sage-400 focus:outline-none"
      />
    </div>
  );
}
