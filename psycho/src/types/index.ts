export type Role = "client" | "psychologist";

export type Language = "ru" | "uz" | "en";

export type Gender = "female" | "male";

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Psychologist {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  verified: boolean;
  gender: Gender;
  approaches: string[];
  topics: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  price: number;
  online: boolean;
  offline: boolean;
  experienceYears: number;
  languages: string[];
  bio: string;
  contacts: { zoom?: string; phone?: string };
  availableDates: Record<string, string[]>; // "2026-06-15": ["09:00","10:00"]
}

export interface Appointment {
  id: string;
  psychologistId: string;
  clientName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: "upcoming" | "completed" | "cancelled";
  createdAt: number;
  format: "online" | "offline";
  clientRequestSummary?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  sender: "client" | "psychologist";
  text: string;
  time: string;
  attachment?: string;
}

export interface ClientQuestionnaire {
  request: string;
  concerns: string[];
  experience: "none" | "some" | "regular" | "";
  language: string;
  format: "online" | "offline" | "any";
  specialistGender: "any" | Gender;
  addressAs: string;
}

export interface PsychologistRegistration {
  fullName: string;
  email: string;
  phone: string;
  specializations: string[];
  experienceYears: string;
  approaches: string[];
  language: string;
  clientGenderPreference: "any" | Gender;
  price: string;
  documents: string[];
  weeklySlots: Record<string, string[]>;
  onlineLink: string;
  officeAddress: string;
}
