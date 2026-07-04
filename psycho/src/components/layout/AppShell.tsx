import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { useApp } from "../../context/AppContext";
import { MY_PSYCHOLOGIST_ID } from "../../context/AppContext";

const NO_NAV_PREFIXES = ["/client/register", "/psychologist/register"];

export function AppShell({ children }: { children: ReactNode }) {
  const { role, appointments } = useApp();
  const location = useLocation();

  const hideNav =
    location.pathname === "/" ||
    NO_NAV_PREFIXES.some((p) => location.pathname.startsWith(p));

  const myUpcoming = appointments.filter(
    (a) => a.psychologistId === MY_PSYCHOLOGIST_ID && a.status === "upcoming",
  ).length;

  return (
    <div className="min-h-screen w-full bg-sage-100 flex items-center justify-center sm:py-6">
      <div className="flex h-[100dvh] w-full max-w-[480px] flex-col bg-cream shadow-[var(--shadow-soft-lg)] sm:h-[860px] sm:rounded-[2.5rem] sm:overflow-hidden sm:border-8 sm:border-white">
        <div className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {!hideNav && role && <BottomNav role={role} appointmentsBadge={myUpcoming} />}
      </div>
    </div>
  );
}
