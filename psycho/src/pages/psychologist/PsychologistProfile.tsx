import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { APPROACHES, TOPICS } from "../../data/mock";
import type { Language } from "../../types";

const LANGS: { code: Language; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbekcha" },
  { code: "en", label: "English" },
];

export function PsychologistProfile() {
  const { psychReg, updatePsychReg, language, setLanguage, setRole } = useApp();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Мой профиль" />

      <div className="flex-1 space-y-4 px-5 pb-6">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-sage-900">Основная информация</h2>
            <button onClick={() => setEditing((v) => !v)} className="text-[12px] font-medium text-sage-600">
              {editing ? "Готово" : "Изменить"}
            </button>
          </div>

          {editing ? (
            <div className="space-y-3">
              <LabeledInput
                label="Полное имя"
                value={psychReg.fullName}
                onChange={(v) => updatePsychReg({ fullName: v })}
              />
              <LabeledInput
                label="Цена за сессию (сум)"
                value={psychReg.price}
                onChange={(v) => updatePsychReg({ price: v })}
              />
              <LabeledInput
                label="Опыт (лет)"
                value={psychReg.experienceYears}
                onChange={(v) => updatePsychReg({ experienceYears: v })}
              />
              <div>
                <p className="mb-1.5 text-[12px] text-sage-500">Специализация</p>
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((t) => (
                    <Chip
                      key={t}
                      active={psychReg.specializations.includes(t)}
                      onClick={() =>
                        updatePsychReg({
                          specializations: psychReg.specializations.includes(t)
                            ? psychReg.specializations.filter((x) => x !== t)
                            : [...psychReg.specializations, t],
                        })
                      }
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[12px] text-sage-500">Подходы</p>
                <div className="flex flex-wrap gap-1.5">
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
                      {a}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-[13px]">
              <Row label="Имя" value={psychReg.fullName || "Не указано"} />
              <Row label="Опыт" value={psychReg.experienceYears ? `${psychReg.experienceYears} лет` : "—"} />
              <Row label="Цена за сессию" value={psychReg.price ? `${psychReg.price} сум` : "—"} />
              <Row label="Специализация" value={psychReg.specializations.join(", ") || "—"} />
              <Row label="Подходы" value={psychReg.approaches.join(", ") || "—"} />
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-[14px] font-semibold text-sage-900">Документы</h2>
          {psychReg.documents.length === 0 ? (
            <p className="text-[12px] text-sage-500">Документы ещё не загружены.</p>
          ) : (
            <div className="space-y-1.5">
              {psychReg.documents.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-sage-700">
                  📎 {d}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-[14px] font-semibold text-sage-900">Настройки</h2>
          <p className="mb-2 text-[12px] text-sage-500">Язык приложения</p>
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

        <Button
          variant="ghost"
          onClick={() => {
            setRole(null);
            navigate("/");
          }}
        >
          Выйти / сменить роль
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

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-[12px] text-sage-500">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-sage-200 px-3 py-2 text-[13px] focus:border-sage-400 focus:outline-none"
      />
    </div>
  );
}
