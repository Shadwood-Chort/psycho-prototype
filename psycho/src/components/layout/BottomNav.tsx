import { NavLink } from "react-router-dom";
import type { Role } from "../../types";

interface NavItem {
  to: string;
  label: string;
  icon: string;
  badge?: number;
}

function clientItems(): NavItem[] {
  return [
    { to: "/client/search", label: "Главная", icon: "🏠" },
    { to: "/client/favorites", label: "Избранное", icon: "♡" },
    { to: "/client/appointments", label: "Записи", icon: "📅" },
    { to: "/client/chats", label: "Чат", icon: "💬" },
    { to: "/client/profile", label: "Профиль", icon: "👤" },
  ];
}

function psychItems(appointmentsBadge: number): NavItem[] {
  return [
    { to: "/psychologist/dashboard", label: "Кабинет", icon: "🏠" },
    { to: "/psychologist/calendar", label: "Календарь", icon: "📆" },
    { to: "/psychologist/appointments", label: "Записи", icon: "📋", badge: appointmentsBadge },
    { to: "/psychologist/chats", label: "Чат", icon: "💬" },
    { to: "/psychologist/profile", label: "Профиль", icon: "👤" },
  ];
}

export function BottomNav({ role, appointmentsBadge = 0 }: { role: Role; appointmentsBadge?: number }) {
  const items = role === "client" ? clientItems() : psychItems(appointmentsBadge);

  return (
    <nav className="shrink-0 border-t border-sage-100 bg-white px-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
      <div className="flex items-center justify-between">
        {items.slice(0, 3).map((item) => (
          <NavTab key={item.to} item={item} />
        ))}

        <NavLink
          to="/sos"
          className="flex flex-col items-center justify-center gap-0.5 px-2 -mt-4"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral text-white text-[11px] font-bold shadow-[var(--shadow-soft-lg)]">
            SOS
          </span>
        </NavLink>

        {items.slice(3).map((item) => (
          <NavTab key={item.to} item={item} />
        ))}
      </div>
    </nav>
  );
}

function NavTab({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        [
          "relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-medium",
          isActive ? "text-sage-600" : "text-sage-400",
        ].join(" ")
      }
    >
      <span className="text-lg leading-none">{item.icon}</span>
      <span>{item.label}</span>
      {!!item.badge && (
        <span className="absolute top-0 right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}
