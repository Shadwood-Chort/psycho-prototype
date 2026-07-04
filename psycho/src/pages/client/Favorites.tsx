import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { RatingStars } from "../../components/ui/RatingStars";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { useT } from "../../i18n/useT";
import { formatPrice } from "../../utils/format";

export function Favorites() {
  const { favorites, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const t = useT();
  const list = PSYCHOLOGISTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex min-h-full flex-col">
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-xl font-semibold text-sage-900">{t("Избранное")}</h1>
      </div>

      <div className="flex-1 space-y-3 px-5 pb-6">
        {list.length === 0 && (
          <p className="pt-10 text-center text-[14px] text-sage-500">
            {t("Вы ещё не добавили специалистов в избранное.")}
          </p>
        )}
        {list.map((p) => (
          <Card key={p.id} className="cursor-pointer" onClick={() => navigate(`/client/specialists/${p.id}`)}>
            <div className="flex gap-3">
              <Avatar initials={p.initials} color={p.avatarColor} size={52} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-[14px] font-semibold text-sage-900">{p.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                    className="text-lg"
                    aria-label={t("Избранное")}
                  >
                    ❤️
                  </button>
                </div>
                <p className="truncate text-[12px] text-sage-500">{p.approaches.map(t).join(", ")}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <RatingStars rating={p.rating} reviewsCount={p.reviewsCount} />
                  <span className="text-[12px] font-semibold text-sage-800">
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
