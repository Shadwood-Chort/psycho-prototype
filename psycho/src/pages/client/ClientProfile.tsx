import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";
import { LANGUAGES } from "../../data/mock";
import type { Language } from "../../types";

const LANGS: { code: Language; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbekcha" },
  { code: "en", label: "English" },
];

export function ClientProfile() {
  const { questionnaire, updateQuestionnaire, language, setLanguage, setRole } = useApp();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const t = useT();

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-semibold text-sage-900">{t("Мой профиль")}</h1>
      </div>

      <div className="flex-1 space-y-4 px-5 pb-6">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-sage-900">{t("Личные данные")}</h2>
            <button
              onClick={() => setEditing((v) => !v)}
              className="text-[12px] font-medium text-sage-600"
            >
              {editing ? t("Готово") : t("Изменить")}
            </button>
          </div>
          {editing ? (
            <div className="space-y-4">
              <Field label={t("Как к вам обращаться?")}>
                <input
                  value={questionnaire.addressAs}
                  onChange={(e) => updateQuestionnaire({ addressAs: e.target.value })}
                  className="w-full rounded-xl border border-sage-200 px-3 py-2 text-[13px] focus:border-sage-400 focus:outline-none"
                />
              </Field>
              <Field label={t("Язык консультации")}>
                <select
                  value={questionnaire.language}
                  onChange={(e) => updateQuestionnaire({ language: e.target.value })}
                  className="w-full rounded-xl border border-sage-200 bg-white px-3 py-2 text-[13px] focus:border-sage-400 focus:outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {t(l)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("Формат")}>
                <div className="flex gap-2">
                  {[
                    { v: "online", label: t("Онлайн") },
                    { v: "offline", label: t("Офлайн") },
                    { v: "any", label: t("Неважно") },
                  ].map((o) => (
                    <Chip
                      key={o.v}
                      active={questionnaire.format === o.v}
                      onClick={() =>
                        updateQuestionnaire({ format: o.v as typeof questionnaire.format })
                      }
                    >
                      {o.label}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label={t("Предпочитаемый пол специалиста")}>
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
                        updateQuestionnaire({
                          specialistGender: o.v as typeof questionnaire.specialistGender,
                        })
                      }
                    >
                      {o.label}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label={t("Основной запрос")}>
                <textarea
                  value={questionnaire.request}
                  onChange={(e) => updateQuestionnaire({ request: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-sage-200 px-3 py-2 text-[13px] focus:border-sage-400 focus:outline-none"
                />
              </Field>
            </div>
          ) : (
            <div className="space-y-2 text-[13px]">
              <Row label={t("Имя")} value={questionnaire.addressAs || t("Не указано")} />
              <Row label={t("Язык консультации")} value={t(questionnaire.language)} />
              <Row
                label={t("Формат")}
                value={
                  questionnaire.format === "online"
                    ? t("Онлайн")
                    : questionnaire.format === "offline"
                      ? t("Офлайн")
                      : t("Неважно")
                }
              />
              <Row
                label={t("Пол специалиста")}
                value={
                  questionnaire.specialistGender === "female"
                    ? t("Женщина")
                    : questionnaire.specialistGender === "male"
                      ? t("Мужчина")
                      : t("Неважно")
                }
              />
              <Row label={t("Основной запрос")} value={questionnaire.request || t("Не указано")} />
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-[14px] font-semibold text-sage-900">{t("Настройки")}</h2>
          <p className="mb-2 text-[12px] text-sage-500">{t("Язык приложения")}</p>
          <div className="flex gap-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={[
                  "flex-1 rounded-xl border py-2 text-[12px] font-medium",
                  language === l.code
                    ? "border-sage-500 bg-sage-500 text-white"
                    : "border-sage-200 bg-white text-sage-700",
                ].join(" ")}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/client/appointments")}
            className="rounded-2xl bg-white p-4 text-left shadow-[var(--shadow-soft)]"
          >
            <p className="text-2xl">📅</p>
            <p className="mt-1 text-[13px] font-medium text-sage-800">{t("Мои записи")}</p>
          </button>
          <button
            onClick={() => navigate("/client/favorites")}
            className="rounded-2xl bg-white p-4 text-left shadow-[var(--shadow-soft)]"
          >
            <p className="text-2xl">🤍</p>
            <p className="mt-1 text-[13px] font-medium text-sage-800">{t("Избранное")}</p>
          </button>
          <button
            onClick={() => navigate("/premium/client")}
            className="rounded-2xl bg-white p-4 text-left shadow-[var(--shadow-soft)]"
          >
            <p className="text-2xl">✨</p>
            <p className="mt-1 text-[13px] font-medium text-sage-800">Premium</p>
          </button>
          <button
            onClick={() => navigate("/about")}
            className="rounded-2xl bg-white p-4 text-left shadow-[var(--shadow-soft)]"
          >
            <p className="text-2xl">ℹ️</p>
            <p className="mt-1 text-[13px] font-medium text-sage-800">{t("О платформе")}</p>
          </button>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            setRole(null);
            navigate("/");
          }}
        >
          {t("Выйти / сменить роль")}
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-sage-500">{label}</span>
      <span className="max-w-[60%] text-right font-medium text-sage-800">{value}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[12px] text-sage-500">{label}</p>
      {children}
    </div>
  );
}
