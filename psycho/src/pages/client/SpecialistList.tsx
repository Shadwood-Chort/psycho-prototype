import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { RatingStars } from "../../components/ui/RatingStars";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { formatPrice } from "../../utils/format";

type SortKey = "rating" | "price" | "experience";

export function SpecialistList() {
  const { searchFilters, favorites, toggleFavorite } = useApp();
  const [sort, setSort] = useState<SortKey>("rating");
  const navigate = useNavigate();
  const t = useT();

  const results = useMemo(() => {
    const filtered = PSYCHOLOGISTS.filter((p) => {
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
    });
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return a.price - b.price;
      return b.experienceYears - a.experienceYears;
    });
    return sorted;
  }, [searchFilters, sort]);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title={t("Специалисты")} onBack={() => navigate("/client/search")} />

      <div className="flex gap-2 overflow-x-auto px-5 pb-2">
        {[
          { v: "rating", label: t("По рейтингу") },
          { v: "price", label: t("По цене") },
          { v: "experience", label: t("По опыту") },
        ].map((o) => (
          <Chip key={o.v} active={sort === o.v} onClick={() => setSort(o.v as SortKey)}>
            {o.label}
          </Chip>
        ))}
      </div>

      <div className="flex-1 space-y-3 px-5 pb-6 pt-2">
        {results.length === 0 && (
          <p className="pt-10 text-center text-[14px] text-sage-500">
            {t("По вашим фильтрам ничего не найдено. Попробуйте изменить критерии.")}
          </p>
        )}
        {results.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer"
            onClick={() => navigate(`/client/specialists/${p.id}`)}
          >
            <div className="flex gap-3">
              <Avatar initials={p.initials} color={p.avatarColor} size={56} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-sage-900">{p.name}</p>
                    <p className="truncate text-[12px] text-sage-500">
                      {p.approaches.map(t).join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                    className="shrink-0 text-lg"
                    aria-label={t("Избранное")}
                  >
                    {favorites.includes(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {p.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-sage-50 px-2 py-0.5 text-[11px] text-sage-600"
                    >
                      {t(topic)}
                    </span>
                  ))}
                  {p.online && (
                    <span className="rounded-full bg-peach-light px-2 py-0.5 text-[11px] text-peach-dark font-medium">
                      {t("Онлайн")}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <RatingStars rating={p.rating} reviewsCount={p.reviewsCount} />
                  <span className="text-[13px] font-semibold text-sage-800">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
