import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { Welcome } from "./pages/welcome/Welcome";

import { ClientRegister } from "./pages/client/ClientRegister";
import { Search } from "./pages/client/Search";
import { SpecialistList } from "./pages/client/SpecialistList";
import { SpecialistProfile } from "./pages/client/SpecialistProfile";
import { Booking } from "./pages/client/Booking";
import { BookingConfirmation } from "./pages/client/BookingConfirmation";
import { ClientAppointments } from "./pages/client/ClientAppointments";
import { Favorites } from "./pages/client/Favorites";
import { ClientProfile } from "./pages/client/ClientProfile";

import { PsychologistRegister } from "./pages/psychologist/PsychologistRegister";
import { Dashboard } from "./pages/psychologist/Dashboard";
import { PsychologistProfile } from "./pages/psychologist/PsychologistProfile";
import { PsychologistCalendar } from "./pages/psychologist/PsychologistCalendar";
import { ScheduleSettings } from "./pages/psychologist/ScheduleSettings";
import { PsychologistAppointments } from "./pages/psychologist/PsychologistAppointments";
import { AppointmentDetail } from "./pages/psychologist/AppointmentDetail";
import { Clients } from "./pages/psychologist/Clients";
import { Reviews } from "./pages/psychologist/Reviews";
import { Content } from "./pages/psychologist/Content";
import { Statistics } from "./pages/psychologist/Statistics";

import { ChatList } from "./pages/shared/ChatList";
import { ChatThread } from "./pages/shared/ChatThread";
import { Sos } from "./pages/shared/Sos";
import { PremiumPsychologist } from "./pages/shared/PremiumPsychologist";
import { PremiumClient } from "./pages/shared/PremiumClient";
import { Payment } from "./pages/shared/Payment";
import { About } from "./pages/shared/About";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client/search" element={<Search />} />
        <Route path="/client/specialists" element={<SpecialistList />} />
        <Route path="/client/specialists/:id" element={<SpecialistProfile />} />
        <Route path="/client/specialists/:id/booking" element={<Booking />} />
        <Route path="/client/booking-confirmed/:id" element={<BookingConfirmation />} />
        <Route path="/client/appointments" element={<ClientAppointments />} />
        <Route path="/client/favorites" element={<Favorites />} />
        <Route path="/client/chats" element={<ChatList />} />
        <Route path="/client/chats/:id" element={<ChatThread />} />
        <Route path="/client/profile" element={<ClientProfile />} />

        <Route path="/psychologist/register" element={<PsychologistRegister />} />
        <Route path="/psychologist/dashboard" element={<Dashboard />} />
        <Route path="/psychologist/profile" element={<PsychologistProfile />} />
        <Route path="/psychologist/calendar" element={<PsychologistCalendar />} />
        <Route path="/psychologist/schedule" element={<ScheduleSettings />} />
        <Route path="/psychologist/appointments" element={<PsychologistAppointments />} />
        <Route path="/psychologist/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/psychologist/clients" element={<Clients />} />
        <Route path="/psychologist/reviews" element={<Reviews />} />
        <Route path="/psychologist/content" element={<Content />} />
        <Route path="/psychologist/statistics" element={<Statistics />} />
        <Route path="/psychologist/chats" element={<ChatList />} />
        <Route path="/psychologist/chats/:id" element={<ChatThread />} />

        <Route path="/sos" element={<Sos />} />
        <Route path="/premium/psychologist" element={<PremiumPsychologist />} />
        <Route path="/premium/client" element={<PremiumClient />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
