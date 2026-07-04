import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useT } from "../../i18n/useT";
import type { Language, Role } from "../../types";

const LANGS: { code: Language; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbekcha" },
  { code: "en", label: "English" },
];

export function Welcome() {
  const { language, setLanguage, setRole, termsAccepted, setTermsAccepted } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigate = useNavigate();
  const t = useT();

  const handleContinue = () => {
    if (!selectedRole || !termsAccepted) return;
    setRole(selectedRole);
    navigate(selectedRole === "client" ? "/client/register" : "/psychologist/register");
  };

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-12">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-sage-500 text-4xl text-white shadow-[var(--shadow-soft-lg)]">
          🌿
        </div>
        <h1 className="text-2xl font-semibold text-sage-900">{t("Добро пожаловать!")}</h1>
        <p className="mt-2 text-[15px] text-sage-600">
          {t("Платформа для поиска психолога и записи на консультацию")}
        </p>

        <div className="mt-8 flex w-full gap-2">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={[
                "flex-1 rounded-xl border py-2.5 text-[13px] font-medium transition-colors",
                language === l.code
                  ? "border-sage-500 bg-sage-500 text-white"
                  : "border-sage-200 bg-white text-sage-700",
              ].join(" ")}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="mt-10 w-full space-y-3 text-left">
          <RoleOption
            emoji="🧑"
            label={t("Я клиент — ищу психолога")}
            active={selectedRole === "client"}
            onClick={() => setSelectedRole("client")}
          />
          <RoleOption
            emoji="🩺"
            label={t("Я психолог — предлагаю консультации")}
            active={selectedRole === "psychologist"}
            onClick={() => setSelectedRole("psychologist")}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label className="flex items-start gap-3 text-[13px] text-sage-700">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-sage-500"
          />
          <span>
            {t("Я принимаю условия пользовательского соглашения и политику конфиденциальности")}
          </span>
        </label>
        <Button disabled={!selectedRole || !termsAccepted} onClick={handleContinue}>
          {t("Продолжить")}
        </Button>
      </div>
    </div>
  );
}

function RoleOption({
  emoji,
  label,
  active,
  onClick,
}: {
  emoji: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
        active ? "border-sage-500 bg-sage-50" : "border-sage-200 bg-white",
      ].join(" ")}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-[14px] font-medium text-sage-800">{label}</span>
    </button>
  );
}
