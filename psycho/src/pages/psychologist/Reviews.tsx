import { Card } from "../../components/ui/Card";
import { RatingStars } from "../../components/ui/RatingStars";
import { TopBar } from "../../components/ui/TopBar";

const MOCK_REVIEWS = [
  { author: "Дильноза К.", rating: 5, text: "Очень внимательный специалист, спасибо за поддержку." },
  { author: "Сергей П.", rating: 4, text: "Хорошая сессия, буду продолжать работу." },
];

export function Reviews() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Отзывы" />
      <div className="flex-1 space-y-3 px-5 pb-6">
        {MOCK_REVIEWS.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-sage-800">{r.author}</span>
              <RatingStars rating={r.rating} />
            </div>
            <p className="mt-1.5 text-[13px] text-sage-600">{r.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
