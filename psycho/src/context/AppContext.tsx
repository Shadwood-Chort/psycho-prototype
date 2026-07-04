import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  Appointment,
  ChatMessage,
  ClientQuestionnaire,
  Language,
  PsychologistRegistration,
  Role,
} from "../types";

export const MY_PSYCHOLOGIST_ID = "me";

const emptyQuestionnaire: ClientQuestionnaire = {
  request: "",
  concerns: [],
  experience: "",
  language: "Русский",
  format: "any",
  specialistGender: "any",
  addressAs: "",
};

const emptyPsychReg: PsychologistRegistration = {
  fullName: "",
  email: "",
  phone: "",
  specializations: [],
  experienceYears: "",
  approaches: [],
  language: "Русский",
  clientGenderPreference: "any",
  price: "",
  documents: [],
  weeklySlots: {},
  onlineLink: "",
  officeAddress: "",
};

const seedAppointments: Appointment[] = [
  {
    id: "a-seed-1",
    psychologistId: MY_PSYCHOLOGIST_ID,
    clientName: "Дильноза К.",
    date: nextDateStr(2),
    time: "11:00",
    status: "upcoming",
    createdAt: Date.now() - 1000,
    format: "online",
    clientRequestSummary:
      "Беспокоит тревога перед важными событиями, хочет научиться справляться со стрессом на работе.",
  },
  {
    id: "a-seed-2",
    psychologistId: MY_PSYCHOLOGIST_ID,
    clientName: "Сергей П.",
    date: nextDateStr(4),
    time: "16:00",
    status: "upcoming",
    createdAt: Date.now() - 2000,
    format: "offline",
    clientRequestSummary:
      "Проблемы в отношениях с партнёром, трудно выражать свои чувства.",
  },
];

function nextDateStr(daysAhead: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

const seedChats: Record<string, ChatMessage[]> = {
  p1: [
    {
      id: "c1",
      chatId: "p1",
      sender: "psychologist",
      text: "Здравствуйте! Рада нашей предстоящей встрече. Если будут вопросы до сессии — пишите сюда.",
      time: "10:02",
    },
    {
      id: "c2",
      chatId: "p1",
      sender: "client",
      text: "Здравствуйте! Спасибо, отправляю анкету заранее.",
      time: "10:05",
      attachment: "Моя_анкета.pdf",
    },
  ],
};

interface AppContextValue {
  role: Role | null;
  setRole: (r: Role | null) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  termsAccepted: boolean;
  setTermsAccepted: (v: boolean) => void;

  questionnaire: ClientQuestionnaire;
  updateQuestionnaire: (patch: Partial<ClientQuestionnaire>) => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  appointments: Appointment[];
  addAppointment: (
    psychologistId: string,
    date: string,
    time: string,
    format: "online" | "offline",
  ) => Appointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, date: string, time: string) => void;
  lastAppointmentId: string | null;

  psychReg: PsychologistRegistration;
  updatePsychReg: (patch: Partial<PsychologistRegistration>) => void;
  psychProfileCompletion: number;

  chats: Record<string, ChatMessage[]>;
  addChatMessage: (chatId: string, sender: "client" | "psychologist", text: string) => void;

  searchFilters: SearchFilters;
  updateSearchFilters: (patch: Partial<SearchFilters>) => void;
}

export interface SearchFilters {
  query: string;
  online: boolean;
  topics: string[];
  approaches: string[];
  priceMax: number;
  gender: "any" | "female" | "male";
}

const defaultSearchFilters: SearchFilters = {
  query: "",
  online: false,
  topics: [],
  approaches: [],
  priceMax: 500000,
  gender: "any",
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [language, setLanguage] = useState<Language>("ru");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [questionnaire, setQuestionnaire] = useState<ClientQuestionnaire>(emptyQuestionnaire);
  const updateQuestionnaire = (patch: Partial<ClientQuestionnaire>) =>
    setQuestionnaire((q) => ({ ...q, ...patch }));

  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const isFavorite = (id: string) => favorites.includes(id);

  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [lastAppointmentId, setLastAppointmentId] = useState<string | null>(null);

  const addAppointment = (
    psychologistId: string,
    date: string,
    time: string,
    format: "online" | "offline",
  ) => {
    const appt: Appointment = {
      id: `a-${Date.now()}`,
      psychologistId,
      clientName: questionnaire.addressAs || "Клиент",
      date,
      time,
      status: "upcoming",
      createdAt: Date.now(),
      format,
      clientRequestSummary: questionnaire.request || undefined,
    };
    setAppointments((list) => [appt, ...list]);
    setLastAppointmentId(appt.id);
    return appt;
  };

  const cancelAppointment = (id: string) =>
    setAppointments((list) =>
      list.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a)),
    );

  const rescheduleAppointment = (id: string, date: string, time: string) =>
    setAppointments((list) =>
      list.map((a) => (a.id === id ? { ...a, date, time, status: "upcoming" } : a)),
    );

  const [psychReg, setPsychReg] = useState<PsychologistRegistration>(emptyPsychReg);
  const updatePsychReg = (patch: Partial<PsychologistRegistration>) =>
    setPsychReg((p) => ({ ...p, ...patch }));

  const psychProfileCompletion = useMemo(() => {
    const fields = [
      psychReg.fullName,
      psychReg.email,
      psychReg.phone,
      psychReg.specializations.length > 0,
      psychReg.experienceYears,
      psychReg.approaches.length > 0,
      psychReg.price,
      psychReg.documents.length > 0,
      Object.keys(psychReg.weeklySlots).length > 0,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [psychReg]);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchFilters);
  const updateSearchFilters = (patch: Partial<SearchFilters>) =>
    setSearchFilters((f) => ({ ...f, ...patch }));

  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(seedChats);
  const addChatMessage = (chatId: string, sender: "client" | "psychologist", text: string) =>
    setChats((c) => ({
      ...c,
      [chatId]: [
        ...(c[chatId] ?? []),
        {
          id: `m-${Date.now()}`,
          chatId,
          sender,
          text,
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }));

  const value: AppContextValue = {
    role,
    setRole,
    language,
    setLanguage,
    termsAccepted,
    setTermsAccepted,
    questionnaire,
    updateQuestionnaire,
    favorites,
    toggleFavorite,
    isFavorite,
    appointments,
    addAppointment,
    cancelAppointment,
    rescheduleAppointment,
    lastAppointmentId,
    psychReg,
    updatePsychReg,
    psychProfileCompletion,
    chats,
    addChatMessage,
    searchFilters,
    updateSearchFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
