import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { RatingStars } from "../../components/ui/RatingStars";
import { TopBar } from "../../components/ui/TopBar";
import { useApp } from "../../context/AppContext";
import { PSYCHOLOGISTS } from "../../data/mock";
import { formatPrice } from "../../utils/format";

export function SpecialistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const psychologist = PSYCHOLOGISTS.find((p) => p.id === id);

  if (!psychologist) {
    return (
      <div className="flex min-h-full flex-col">
        <TopBar title="Специалист не найден" />
      </div>
    );
  }

  const p = psychologist;

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        title="Профиль специалиста"
        right={
          <button onClick={() => toggleFavorite(p.id)} className="text-xl" aria-label="В избранное">
            {favorites.includes(p.id) ? "❤️" : "🤍"}
          </button>
        }
      />

      <div className="flex-1 px-5 pb-4">
        <div className="flex flex-col items-center pt-2 text-center">
          <Avatar initials={p.initials} color={p.avatarColor} size={88} />
          <div className="mt-3 flex items-center gap-1.5">
            <h1 className="text-lg font-semibold text-sage-900">{p.name}</h1>
            {p.verified && <span title="Проверенный специалист">✅</span>}
          </div>
          <p className="text-[13px] text-sage-500">{p.approaches.join(" · ")}</p>
          <div className="mt-1">
            <RatingStars rating={p.rating} reviewsCount={p.reviewsCount} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatChip label="Опыт" value={`${p.experienceYears} лет`} />
          <StatChip label="Сессия" value={formatPrice(p.price)} />
          <StatChip label="Язык" value={p.languages[0]} />
        </div>

        <Section title="О себе">
          <p className="text-[14px] leading-relaxed text-sage-700">{p.bio}</p>
        </Section>

        <Section title="Подходы и методы">
          <div className="flex flex-wrap gap-2">
            {p.approaches.map((a) => (
              <span key={a} className="rounded-full bg-sage-50 px-3 py-1 text-[12px] text-sage-700">
                {a}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Темы">
          <div className="flex flex-wrap gap-2">
            {p.topics.map((t) => (
              <span key={t} className="rounded-full bg-peach-light px-3 py-1 text-[12px] text-peach-dark">
                {t}
              </span>
            ))}
          </div>
        </Section>

        <Section title={`Отзывы (${p.reviewsCount})`}>
          <div className="space-y-2">
            {p.reviews.map((r) => (
              <Card key={r.id} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-sage-800">{r.author}</span>
                  <RatingStars rating={r.rating} />
                </div>
                <p className="mt-1 text-[13px] text-sage-600">{r.text}</p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button onClick={() => navigate(`/client/specialists/${p.id}/booking`)}>Записаться</Button>
      </div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-2.5 text-center shadow-[var(--shadow-soft)]">
      <p className="text-[10px] text-sage-500">{label}</p>
      <p className="mt-0.5 truncate text-[12px] font-semibold text-sage-800">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="mb-2 text-[14px] font-semibold text-sage-900">{title}</h2>
      {children}
    </div>
  );
}
