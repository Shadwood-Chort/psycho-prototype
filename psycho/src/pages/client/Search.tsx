import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { useApp } from "../../context/AppContext";
import { APPROACHES, LANGUAGES, PSYCHOLOGISTS, TOPICS } from "../../data/mock";
import { formatPrice } from "../../utils/format";

export function Search() {
  const { searchFilters, updateSearchFilters } = useApp();
  const navigate = useNavigate();

  const count = useMemo(() => {
    return PSYCHOLOGISTS.filter((p) => {
      if (searchFilters.online && !p.online) return false;
      if (p.price > searchFilters.priceMax) return false;
      if (searchFilters.gender !== "any" && p.gender !== searchFilters.gender) return false;
      if (
        searchFilters.topics.length > 0 &&
        !searchFilters.topics.some((t) => p.topics.includes(t))
      )
        return false;
      if (
        searchFilters.approaches.length > 0 &&
        !searchFilters.approaches.some((a) => p.approaches.includes(a))
      )
        return false;
      if (
        searchFilters.query &&
        !p.name.toLowerCase().includes(searchFilters.query.toLowerCase())
      )
        return false;
      return true;
    }).length;
  }, [searchFilters]);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-xl font-semibold text-sage-900">Найдите своего специалиста</h1>
        <p className="mt-1 text-[13px] text-sage-600">Настройте фильтры под свой запрос</p>
      </div>

      <div className="flex-1 space-y-6 px-5 pb-4 pt-2">
        <input
          value={searchFilters.query}
          onChange={(e) => updateSearchFilters({ query: e.target.value })}
          placeholder="Поиск по имени специалиста"
          className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-[14px] text-sage-800 placeholder:text-sage-400 focus:border-sage-400 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          <Chip active={searchFilters.online} onClick={() => updateSearchFilters({ online: !searchFilters.online })}>
            Онлайн
          </Chip>
          <Chip active={false}>Язык: {LANGUAGES[0]}</Chip>
          <Chip active={searchFilters.approaches.length > 0}>Подход</Chip>
        </div>

        <FilterSection title="Популярные запросы">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <Chip
                key={t}
                active={searchFilters.topics.includes(t)}
                onClick={() => updateSearchFilters({ topics: toggle(searchFilters.topics, t) })}
              >
                {t}
              </Chip>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Подходы">
          <div className="flex flex-wrap gap-2">
            {APPROACHES.map((a) => (
              <Chip
                key={a}
                active={searchFilters.approaches.includes(a)}
                onClick={() =>
                  updateSearchFilters({ approaches: toggle(searchFilters.approaches, a) })
                }
              >
                {a}
              </Chip>
            ))}
          </div>
        </FilterSection>

        <FilterSection title={`Цена за сессию: до ${formatPrice(searchFilters.priceMax)}`}>
          <input
            type="range"
            min={0}
            max={500000}
            step={10000}
            value={searchFilters.priceMax}
            onChange={(e) => updateSearchFilters({ priceMax: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-sage-400">
            <span>0 сум</span>
            <span>500 000 сум</span>
          </div>
        </FilterSection>

        <FilterSection title="Пол специалиста">
          <div className="flex gap-2">
            {[
              { v: "any", label: "Неважно" },
              { v: "female", label: "Женщина" },
              { v: "male", label: "Мужчина" },
            ].map((o) => (
              <Chip
                key={o.v}
                active={searchFilters.gender === o.v}
                onClick={() => updateSearchFilters({ gender: o.v as any })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </FilterSection>
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button onClick={() => navigate("/client/specialists")}>
          Показать {count} специалистов
        </Button>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-[13px] font-medium text-sage-700">{title}</h2>
      {children}
    </div>
  );
}
