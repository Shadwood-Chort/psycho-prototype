import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { TopBar } from "../../components/ui/TopBar";
import { useApp, MY_PSYCHOLOGIST_ID } from "../../context/AppContext";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Clients() {
  const { appointments } = useApp();
  const navigate = useNavigate();

  const clients = Array.from(
    new Map(
      appointments
        .filter((a) => a.psychologistId === MY_PSYCHOLOGIST_ID)
        .map((a) => [a.clientName, a]),
    ).values(),
  );

  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Клиенты" />
      <div className="flex-1 space-y-3 px-5 pb-6">
        {clients.length === 0 && (
          <p className="pt-10 text-center text-[14px] text-sage-500">Пока нет клиентов.</p>
        )}
        {clients.map((a) => (
          <Card
            key={a.clientName}
            className="flex cursor-pointer items-center gap-3"
            onClick={() => navigate(`/psychologist/appointments/${a.id}`)}
          >
            <Avatar initials={initialsOf(a.clientName)} color="#AEC7A7" size={44} />
            <div>
              <p className="text-[14px] font-semibold text-sage-900">{a.clientName}</p>
              <p className="text-[12px] text-sage-500">
                {a.clientRequestSummary ? a.clientRequestSummary.slice(0, 50) + "…" : "Нет анкеты"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
