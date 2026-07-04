import type { Psychologist } from "../types";

export const TOPICS = [
  "Тревога",
  "Отношения",
  "Самооценка",
  "Выгорание",
  "Депрессия",
  "Другое",
];

export const APPROACHES = [
  "КПТ",
  "Гештальт",
  "Психоанализ",
  "EMDR",
  "Арт-терапия",
  "Mindfulness",
  "Другие",
];

export const LANGUAGES = ["Русский", "Узбекский", "Английский"];

export const AVATAR_COLORS = [
  "#8FA98F",
  "#E8BD9A",
  "#C9D9C4",
  "#E2725B",
  "#AEC7A7",
  "#F3D9C4",
];

const ALL_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Deterministic pseudo-random generator so slots stay stable across re-renders.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateAvailableDates(seed: number): Record<string, string[]> {
  const rand = seededRandom(seed);
  const result: Record<string, string[]> = {};
  const today = new Date();
  for (let i = 1; i <= 45; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // skip ~40% of days entirely (fully booked / day off)
    if (rand() < 0.4) continue;
    const slots = ALL_TIMES.filter(() => rand() > 0.55);
    if (slots.length > 0) {
      result[dateKey(d)] = slots;
    }
  }
  return result;
}

function reviews(id: string, names: string[], texts: string[]) {
  return names.map((n, i) => ({
    id: `${id}-r${i}`,
    author: n,
    rating: 4 + (i % 2 === 0 ? 1 : 0),
    text: texts[i % texts.length],
    date: `2026-0${(i % 6) + 1}-1${i}`,
  }));
}

export const PSYCHOLOGISTS: Psychologist[] = [
  {
    id: "p1",
    name: "Анна Петрова",
    avatarColor: AVATAR_COLORS[0],
    initials: "АП",
    verified: true,
    gender: "female",
    approaches: ["КПТ", "Mindfulness"],
    topics: ["Тревога", "Выгорание"],
    rating: 4.9,
    reviewsCount: 128,
    reviews: reviews(
      "p1",
      ["Дильноза", "Сергей", "Малика"],
      [
        "Очень внимательный специалист, помогла разобраться с тревогой.",
        "После нескольких сессий стало заметно легче справляться со стрессом на работе.",
        "Рекомендую, чувствуешь себя услышанным.",
      ],
    ),
    price: 180000,
    online: true,
    offline: false,
    experienceYears: 8,
    languages: ["Русский", "Английский"],
    bio: "Работаю с тревожными расстройствами и профессиональным выгоранием. Использую когнитивно-поведенческий подход и техники осознанности. Создаю бережное пространство без осуждения.",
    contacts: { zoom: "https://zoom.us/j/1234567890" },
    availableDates: generateAvailableDates(1),
  },
  {
    id: "p2",
    name: "Мария Иванова",
    avatarColor: AVATAR_COLORS[1],
    initials: "МИ",
    verified: true,
    gender: "female",
    approaches: ["Гештальт", "Арт-терапия"],
    topics: ["Отношения", "Самооценка"],
    rating: 4.8,
    reviewsCount: 94,
    reviews: reviews(
      "p2",
      ["Азиз", "Камила"],
      [
        "Мария помогла мне выстроить границы в отношениях.",
        "Очень тёплая атмосфера на сессиях, спасибо большое.",
      ],
    ),
    price: 220000,
    online: true,
    offline: true,
    experienceYears: 11,
    languages: ["Русский", "Узбекский"],
    bio: "Гештальт-терапевт с фокусом на отношениях и самооценке. Помогаю клиентам лучше понимать свои чувства и потребности через творческие методы.",
    contacts: { zoom: "https://zoom.us/j/2233445566" },
    availableDates: generateAvailableDates(2),
  },
  {
    id: "p3",
    name: "Дмитрий С.",
    avatarColor: AVATAR_COLORS[2],
    initials: "ДС",
    verified: true,
    gender: "male",
    approaches: ["Психоанализ"],
    topics: ["Депрессия", "Отношения"],
    rating: 4.7,
    reviewsCount: 61,
    reviews: reviews(
      "p3",
      ["Наталья", "Рустам"],
      [
        "Глубокий подход, много размышлений после каждой встречи.",
        "Специалист высокого уровня, помог разобраться в детских травмах.",
      ],
    ),
    price: 250000,
    online: true,
    offline: true,
    experienceYears: 15,
    languages: ["Русский"],
    bio: "Практикую психоанализ более 15 лет. Работаю с депрессивными состояниями и сложностями в близких отношениях, помогаю находить причины повторяющихся паттернов.",
    contacts: { zoom: "https://zoom.us/j/3344556677" },
    availableDates: generateAvailableDates(3),
  },
  {
    id: "p4",
    name: "Севара Юсупова",
    avatarColor: AVATAR_COLORS[3],
    initials: "СЮ",
    verified: false,
    gender: "female",
    approaches: ["EMDR", "КПТ"],
    topics: ["Тревога", "Депрессия"],
    rating: 4.6,
    reviewsCount: 37,
    reviews: reviews(
      "p4",
      ["Ойбек"],
      ["Помогла справиться с паническими атаками, очень благодарен."],
    ),
    price: 160000,
    online: true,
    offline: false,
    experienceYears: 5,
    languages: ["Русский", "Узбекский"],
    bio: "Специализируюсь на работе с травмой методом EMDR, а также использую КПТ для тревожных и депрессивных состояний.",
    contacts: { zoom: "https://zoom.us/j/4455667788" },
    availableDates: generateAvailableDates(4),
  },
  {
    id: "p5",
    name: "Ботир Каримов",
    avatarColor: AVATAR_COLORS[4],
    initials: "БК",
    verified: true,
    gender: "male",
    approaches: ["Гештальт", "Mindfulness"],
    topics: ["Выгорание", "Самооценка"],
    rating: 4.9,
    reviewsCount: 152,
    reviews: reviews(
      "p5",
      ["Мадина", "Шерзод", "Гульнара"],
      [
        "Очень мудрый и спокойный специалист.",
        "Помог найти баланс между работой и личной жизнью.",
        "Рекомендую всем, кто выгорел на работе.",
      ],
    ),
    price: 200000,
    online: true,
    offline: true,
    experienceYears: 10,
    languages: ["Русский", "Узбекский", "Английский"],
    bio: "Работаю с профессиональным выгоранием и вопросами самооценки. Соединяю гештальт-подход с практиками осознанности.",
    contacts: { zoom: "https://zoom.us/j/5566778899" },
    availableDates: generateAvailableDates(5),
  },
  {
    id: "p6",
    name: "Елена Волкова",
    avatarColor: AVATAR_COLORS[5],
    initials: "ЕВ",
    verified: false,
    gender: "female",
    approaches: ["Арт-терапия", "Другие"],
    topics: ["Самооценка", "Отношения"],
    rating: 4.5,
    reviewsCount: 22,
    reviews: reviews(
      "p6",
      ["Диана"],
      ["Творческий и мягкий подход, много инсайтов о себе."],
    ),
    price: 140000,
    online: true,
    offline: false,
    experienceYears: 3,
    languages: ["Русский"],
    bio: "Молодой специалист, использую арт-терапевтические техники, чтобы помочь клиентам выразить и осознать сложные чувства.",
    contacts: { zoom: "https://zoom.us/j/6677889900" },
    availableDates: generateAvailableDates(6),
  },
];

export const HOTLINES = [
  {
    name: "Психологическая помощь (бесплатно, круглосуточно)",
    number: "1050",
  },
  {
    name: "Служба экстренной психологической помощи",
    number: "1010",
  },
  {
    name: "Телефон доверия для детей и подростков",
    number: "150",
  },
  {
    name: "Единый номер экстренных служб",
    number: "112",
  },
];
