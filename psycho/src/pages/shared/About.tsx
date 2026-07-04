import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";

const POINTS = [
  "Платформа не заменяет врачебную помощь и не оказывает экстренную психиатрическую помощь.",
  "Каждый психолог несёт персональную ответственность за качество и этичность своей консультационной практики.",
  "Платформа предоставляет только техническое решение для поиска специалиста и коммуникации — оплата и оказание услуг происходят напрямую между клиентом и психологом.",
  "Если вам нужна срочная помощь, воспользуйтесь разделом SOS или обратитесь на горячую линию.",
];

export function About() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Важно знать" />
      <div className="flex-1 space-y-3 px-5 pb-6">
        {POINTS.map((p, i) => (
          <Card key={i} className="flex gap-3">
            <span className="text-lg">•</span>
            <p className="text-[13px] leading-relaxed text-sage-700">{p}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
