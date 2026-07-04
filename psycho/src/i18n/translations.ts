import type { Language } from "../types";

// Keyed by the Russian source string (used directly in JSX as t("Русский текст")).
// Only "uz" and "en" need entries — Russian is the fallback for any missing key.
const DICT: Record<string, { uz: string; en: string }> = {
  // Bottom nav
  "Главная": { uz: "Bosh sahifa", en: "Home" },
  "Кабинет": { uz: "Kabinet", en: "Dashboard" },
  "Избранное": { uz: "Sevimlilar", en: "Favorites" },
  "Записи": { uz: "Yozuvlar", en: "Bookings" },
  "Календарь": { uz: "Kalendar", en: "Calendar" },
  "Чат": { uz: "Chat", en: "Chat" },
  "Профиль": { uz: "Profil", en: "Profile" },

  // Welcome
  "Добро пожаловать!": { uz: "Xush kelibsiz!", en: "Welcome!" },
  "Платформа для поиска психолога и записи на консультацию": {
    uz: "Psixolog topish va konsultatsiyaga yozilish uchun platforma",
    en: "A platform to find a psychologist and book a consultation",
  },
  "Я клиент — ищу психолога": { uz: "Men mijozman — psixolog izlayapman", en: "I'm a client — looking for a psychologist" },
  "Я психолог — предлагаю консультации": { uz: "Men psixologman — konsultatsiya beraman", en: "I'm a psychologist — offering consultations" },
  "Я принимаю условия пользовательского соглашения и политику конфиденциальности": {
    uz: "Men foydalanuvchi shartnomasi va maxfiylik siyosati shartlarini qabul qilaman",
    en: "I accept the terms of service and privacy policy",
  },
  "Продолжить": { uz: "Davom etish", en: "Continue" },

  // Common actions
  "Далее": { uz: "Keyingi", en: "Next" },
  "Назад": { uz: "Orqaga", en: "Back" },
  "Изменить": { uz: "O'zgartirish", en: "Edit" },
  "Готово": { uz: "Tayyor", en: "Done" },
  "Отменить": { uz: "Bekor qilish", en: "Cancel" },
  "Подтвердить": { uz: "Tasdiqlash", en: "Confirm" },
  "Отправить": { uz: "Yuborish", en: "Send" },

  // Client registration (questionnaire)
  "С чем вы хотите обратиться?": { uz: "Qanday masala bilan murojaat qilmoqchisiz?", en: "What would you like help with?" },
  "Расскажите немного о себе": { uz: "O'zingiz haqingizda qisqacha ma'lumot bering", en: "Tell us a bit about yourself" },
  "Проверьте свои ответы": { uz: "Javoblaringizni tekshiring", en: "Review your answers" },
  "Продолжить поиск": { uz: "Qidiruvni davom ettirish", en: "Continue to search" },
  "Опишите свободно, с чем вы хотите обратиться": {
    uz: "Nima bilan murojaat qilmoqchi ekaningizni erkin yozing",
    en: "Freely describe what you'd like to talk about",
  },
  "Что вас беспокоит больше всего?": { uz: "Sizni eng ko'p nima tashvishlantiradi?", en: "What concerns you the most?" },
  "Ваш опыт терапии": { uz: "Terapiya tajribangiz", en: "Your therapy experience" },
  "Без опыта": { uz: "Tajribam yo'q", en: "No experience" },
  "Был(а) опыт": { uz: "Tajribam bor edi", en: "Had some experience" },
  "Регулярно хожу": { uz: "Muntazam boraman", en: "Attend regularly" },
  "Язык консультации": { uz: "Konsultatsiya tili", en: "Consultation language" },
  "Формат": { uz: "Format", en: "Format" },
  "Онлайн": { uz: "Onlayn", en: "Online" },
  "Офлайн": { uz: "Oflayn", en: "Offline" },
  "Неважно": { uz: "Farqi yo'q", en: "Doesn't matter" },
  "Предпочитаемый пол специалиста": { uz: "Mutaxassisning afzal ko'rilgan jinsi", en: "Preferred specialist gender" },
  "Женщина": { uz: "Ayol", en: "Female" },
  "Мужчина": { uz: "Erkak", en: "Male" },
  "Как к вам обращаться?": { uz: "Sizga qanday murojaat qilishim mumkin?", en: "How should we address you?" },
  "Запрос": { uz: "So'rov", en: "Request" },
  "Беспокоит": { uz: "Tashvishlantiradi", en: "Concerns" },
  "Обращение": { uz: "Murojaat", en: "Address as" },
  "Проверьте, всё ли верно. Эти данные помогут подобрать подходящего специалиста и будут доступны психологу перед сессией.": {
    uz: "Hammasi to'g'ri ekanligini tekshiring. Bu ma'lumotlar mos mutaxassisni tanlashga yordam beradi va sessiyadan oldin psixologga ko'rinadi.",
    en: "Please review your answers. This information will help match you with a suitable specialist and will be visible to them before the session.",
  },

  // Search
  "Найдите своего специалиста": { uz: "O'z mutaxassisingizni toping", en: "Find your specialist" },
  "Настройте фильтры под свой запрос": { uz: "Filtrlarni so'rovingizga moslang", en: "Adjust the filters to your request" },
  "Поиск по имени специалиста": { uz: "Mutaxassis ismi bo'yicha qidirish", en: "Search by specialist name" },
  "Популярные запросы": { uz: "Mashhur so'rovlar", en: "Popular topics" },
  "Подходы": { uz: "Yondashuvlar", en: "Approaches" },
  "Пол специалиста": { uz: "Mutaxassis jinsi", en: "Specialist gender" },
  "Только онлайн": { uz: "Faqat onlayn", en: "Online only" },

  // Specialist list / profile
  "Специалисты": { uz: "Mutaxassislar", en: "Specialists" },
  "По рейтингу": { uz: "Reyting bo'yicha", en: "By rating" },
  "По цене": { uz: "Narx bo'yicha", en: "By price" },
  "По опыту": { uz: "Tajriba bo'yicha", en: "By experience" },
  "По вашим фильтрам ничего не найдено. Попробуйте изменить критерии.": {
    uz: "Filtrlaringiz bo'yicha hech narsa topilmadi. Mezonlarni o'zgartirib ko'ring.",
    en: "Nothing found for your filters. Try adjusting the criteria.",
  },
  "Профиль специалиста": { uz: "Mutaxassis profili", en: "Specialist profile" },
  "О себе": { uz: "O'zim haqimda", en: "About" },
  "Подходы и методы": { uz: "Yondashuvlar va usullar", en: "Approaches & methods" },
  "Темы": { uz: "Mavzular", en: "Topics" },
  "Отзывы": { uz: "Sharhlar", en: "Reviews" },
  "Записаться": { uz: "Yozilish", en: "Book now" },
  "Опыт": { uz: "Tajriba", en: "Experience" },
  "Сессия": { uz: "Sessiya", en: "Session" },
  "Язык": { uz: "Til", en: "Language" },

  // Booking / calendar
  "Свободное время на": { uz: "Bo'sh vaqt:", en: "Available times for" },
  "На эту дату нет свободных слотов. Выберите другой день.": {
    uz: "Bu sanada bo'sh vaqt yo'q. Boshqa kunni tanlang.",
    en: "No available slots on this date. Please choose another day.",
  },
  "Предложите мне время": { uz: "Menga vaqt taklif qiling", en: "Suggest a time for me" },
  "Опишите, когда вам удобно — специалист свяжется с вами для согласования.": {
    uz: "Sizga qulay vaqtni yozing — mutaxassis siz bilan bog'lanadi.",
    en: "Describe when it's convenient for you — the specialist will reach out to arrange it.",
  },
  "Отправить предложение": { uz: "Taklifni yuborish", en: "Send suggestion" },
  "Время указано по часовому поясу Ташкент, GMT+5": {
    uz: "Vaqt Toshkent, GMT+5 vaqt mintaqasida ko'rsatilgan",
    en: "Time shown in Tashkent timezone, GMT+5",
  },
  "Подтвердить запись": { uz: "Yozuvni tasdiqlash", en: "Confirm booking" },
  "Перенос записи": { uz: "Yozuvni ko'chirish", en: "Reschedule booking" },
  "Свободно": { uz: "Bo'sh", en: "Available" },
  "Частично занято": { uz: "Qisman band", en: "Partially booked" },
  "Занято": { uz: "Band", en: "Booked" },
  "Настроить расписание": { uz: "Jadvalni sozlash", en: "Configure schedule" },
  "Есть свободное время": { uz: "Bo'sh vaqt bor", en: "Available times" },

  // Booking confirmation
  "Запись подтверждена!": { uz: "Yozuv tasdiqlandi!", en: "Booking confirmed!" },
  "Запись не найдена.": { uz: "Yozuv topilmadi.", en: "Booking not found." },
  "Запись не найдена": { uz: "Yozuv topilmadi", en: "Booking not found" },
  "Вернуться к поиску": { uz: "Qidiruvga qaytish", en: "Back to search" },
  "Мы напомним вам о встрече за 24 часа и за 1 час до начала сессии.": {
    uz: "Sessiya boshlanishidan 24 soat va 1 soat oldin sizga eslatib qo'yamiz.",
    en: "We'll remind you 24 hours and 1 hour before the session.",
  },
  "Добавить в календарь": { uz: "Kalendarga qo'shish", en: "Add to calendar" },
  "Перейти к чату": { uz: "Chatga o'tish", en: "Go to chat" },

  // Client appointments / favorites
  "Мои записи": { uz: "Mening yozuvlarim", en: "My bookings" },
  "У вас пока нет записей. Найдите специалиста и запишитесь на консультацию.": {
    uz: "Hozircha yozuvlaringiz yo'q. Mutaxassis topib, konsultatsiyaga yoziling.",
    en: "You don't have any bookings yet. Find a specialist and book a consultation.",
  },
  "Просмотр": { uz: "Ko'rish", en: "View" },
  "Перенести": { uz: "Ko'chirish", en: "Reschedule" },
  "Предстоит": { uz: "Kutilmoqda", en: "Upcoming" },
  "Завершена": { uz: "Yakunlandi", en: "Completed" },
  "Отменена": { uz: "Bekor qilindi", en: "Cancelled" },
  "Вы ещё не добавили специалистов в избранное.": {
    uz: "Siz hali mutaxassislarni sevimlilarga qo'shmagansiz.",
    en: "You haven't added any specialists to favorites yet.",
  },

  // Client profile
  "Мой профиль": { uz: "Mening profilim", en: "My profile" },
  "Личные данные": { uz: "Shaxsiy ma'lumotlar", en: "Personal info" },
  "Имя": { uz: "Ism", en: "Name" },
  "Основной запрос": { uz: "Asosiy so'rov", en: "Main request" },
  "Настройки": { uz: "Sozlamalar", en: "Settings" },
  "Язык приложения": { uz: "Ilova tili", en: "App language" },
  "Выйти / сменить роль": { uz: "Chiqish / rolni almashtirish", en: "Log out / switch role" },
  "Не указано": { uz: "Ko'rsatilmagan", en: "Not specified" },

  // SOS
  "Нужна помощь прямо сейчас?": { uz: "Hozir yordam kerakmi?", en: "Need help right now?" },
  "Вы не одни. Если вам тяжело — воспользуйтесь одной из линий поддержки ниже.": {
    uz: "Siz yolg'iz emassiz. Qiyin bo'lsa — quyidagi yordam liniyalaridan birini tanlang.",
    en: "You're not alone. If things feel hard, use one of the support lines below.",
  },
  "Написать в поддержку": { uz: "Yordam xizmatiga yozish", en: "Message support" },

  // Chat
  "Чаты": { uz: "Chatlar", en: "Chats" },
  "Чаты с клиентами": { uz: "Mijozlar bilan chatlar", en: "Chats with clients" },
  "Пока нет активных чатов с клиентами.": {
    uz: "Hozircha mijozlar bilan faol chatlar yo'q.",
    en: "No active chats with clients yet.",
  },
  "У вас пока нет чатов. Запишитесь на консультацию, чтобы начать общение.": {
    uz: "Hozircha chatlaringiz yo'q. Muloqotni boshlash uchun konsultatsiyaga yoziling.",
    en: "You have no chats yet. Book a consultation to start a conversation.",
  },
  "Нажмите, чтобы начать диалог": { uz: "Suhbatni boshlash uchun bosing", en: "Tap to start the conversation" },
  "Здесь пока нет сообщений. Начните диалог!": {
    uz: "Bu yerda hali xabarlar yo'q. Suhbatni boshlang!",
    en: "No messages yet. Start the conversation!",
  },
  "Написать сообщение...": { uz: "Xabar yozing...", en: "Write a message..." },

  // Psychologist registration
  "Личная информация": { uz: "Shaxsiy ma'lumot", en: "Personal information" },
  "Квалификация": { uz: "Malaka", en: "Qualification" },
  "Документы и верификация": { uz: "Hujjatlar va tasdiqlash", en: "Documents & verification" },
  "Настройка расписания": { uz: "Jadvalni sozlash", en: "Schedule setup" },
  "Готово!": { uz: "Tayyor!", en: "Done!" },
  "Полное имя": { uz: "To'liq ism", en: "Full name" },
  "Телефон": { uz: "Telefon", en: "Phone" },
  "Специализация (темы)": { uz: "Mutaxassislik (mavzular)", en: "Specialization (topics)" },
  "Опыт работы (лет)": { uz: "Ish tajribasi (yil)", en: "Years of experience" },
  "Язык консультаций": { uz: "Konsultatsiya tili", en: "Consultation language" },
  "Предпочитаемый пол клиента": { uz: "Mijozning afzal ko'rilgan jinsi", en: "Preferred client gender" },
  "Женщины": { uz: "Ayollar", en: "Women" },
  "Мужчины": { uz: "Erkaklar", en: "Men" },
  "Цена за сессию (сум)": { uz: "Sessiya narxi (so'm)", en: "Price per session (UZS)" },
  "Загрузите диплом и сертификаты, подтверждающие квалификацию.": {
    uz: "Malakangizni tasdiqlovchi diplom va sertifikatlarni yuklang.",
    en: "Upload your diploma and certificates confirming your qualification.",
  },
  "Нажмите, чтобы загрузить файл": { uz: "Fayl yuklash uchun bosing", en: "Tap to upload a file" },
  "Документы проходят модерацию. Обычно это занимает 1–2 рабочих дня.": {
    uz: "Hujjatlar moderatsiyadan o'tadi. Odatda bu 1–2 ish kunini oladi.",
    en: "Documents go through moderation. This usually takes 1–2 business days.",
  },
  "Отметьте дни недели и удобное время для консультаций. Изменения сразу отразятся в календаре.": {
    uz: "Konsultatsiyalar uchun qulay hafta kunlari va vaqtni belgilang. O'zgarishlar darhol kalendarda aks etadi.",
    en: "Mark the weekdays and times that suit you for consultations. Changes reflect in the calendar immediately.",
  },
  "Отметьте дни недели и удобное время для консультаций.": {
    uz: "Konsultatsiyalar uchun qulay hafta kunlari va vaqtni belgilang.",
    en: "Mark the weekdays and times that suit you for consultations.",
  },
  "Ссылка для онлайн-консультаций (Zoom)": { uz: "Onlayn konsultatsiya havolasi (Zoom)", en: "Link for online consultations (Zoom)" },
  "Адрес для очных консультаций (необязательно)": {
    uz: "Yuzma-yuz konsultatsiya manzili (ixtiyoriy)",
    en: "Address for in-person consultations (optional)",
  },
  "Анкета отправлена!": { uz: "Anketa yuborildi!", en: "Application submitted!" },
  "Мы проверим ваши документы и активируем профиль в течение 1–2 рабочих дней. А пока вы можете заполнить кабинет и настроить расписание.": {
    uz: "Hujjatlaringizni tekshiramiz va profilingizni 1–2 ish kuni ichida faollashtiramiz. Shu vaqt ichida kabinetni to'ldirib, jadvalni sozlashingiz mumkin.",
    en: "We'll review your documents and activate your profile within 1–2 business days. Meanwhile, you can fill in your dashboard and set up your schedule.",
  },
  "Перейти в кабинет": { uz: "Kabinetga o'tish", en: "Go to dashboard" },

  // Psychologist dashboard
  "Профиль заполнен": { uz: "Profil to'ldirilgan", en: "Profile completed" },
  "Ваше имя": { uz: "Ismingiz", en: "Your name" },
  "Укажите подходы в профиле": { uz: "Profilda yondashuvlarni belgilang", en: "Specify your approaches in your profile" },
  "Календарь и расписание": { uz: "Kalendar va jadval", en: "Calendar & schedule" },
  "Клиенты": { uz: "Mijozlar", en: "Clients" },
  "Мои материалы": { uz: "Materiallarim", en: "My content" },
  "Статистика": { uz: "Statistika", en: "Statistics" },

  // Psychologist appointments / clients
  "Пока нет записей клиентов.": { uz: "Hozircha mijoz yozuvlari yo'q.", en: "No client bookings yet." },
  "Запись клиента": { uz: "Mijoz yozuvi", en: "Client booking" },
  "Анкета клиента": { uz: "Mijoz anketasi", en: "Client questionnaire" },
  // Mock vocabulary: topics, approaches, languages (shared across search/questionnaire/profiles)
  "Тревога": { uz: "Xavotir", en: "Anxiety" },
  "Отношения": { uz: "Munosabatlar", en: "Relationships" },
  "Самооценка": { uz: "O'z-o'ziga baho", en: "Self-esteem" },
  "Выгорание": { uz: "Charchash (burnout)", en: "Burnout" },
  "Депрессия": { uz: "Depressiya", en: "Depression" },
  "Другое": { uz: "Boshqa", en: "Other" },
  "КПТ": { uz: "KPT", en: "CBT" },
  "Гештальт": { uz: "Geshtalt", en: "Gestalt" },
  "Психоанализ": { uz: "Psixoanaliz", en: "Psychoanalysis" },
  "Арт-терапия": { uz: "San'at terapiyasi", en: "Art therapy" },
  "Другие": { uz: "Boshqalar", en: "Other" },
  "Русский": { uz: "Ruscha", en: "Russian" },
  "Узбекский": { uz: "O'zbekcha", en: "Uzbek" },
  "Английский": { uz: "Inglizcha", en: "English" },

  "Психологическая помощь (бесплатно, круглосуточно)": {
    uz: "Psixologik yordam (bepul, kecha-kunduz)",
    en: "Psychological help (free, 24/7)",
  },
  "Служба экстренной психологической помощи": {
    uz: "Shoshilinch psixologik yordam xizmati",
    en: "Emergency psychological help service",
  },
  "Телефон доверия для детей и подростков": {
    uz: "Bolalar va o'smirlar uchun ishonch telefoni",
    en: "Trust hotline for children and teenagers",
  },
  "Единый номер экстренных служб": { uz: "Yagona favqulodda xizmatlar raqami", en: "Unified emergency services number" },

  "Клиент не оставил дополнительной информации о своём запросе.": {
    uz: "Mijoz so'rovi haqida qo'shimcha ma'lumot qoldirmagan.",
    en: "The client didn't leave any additional information about their request.",
  },
  "Обсудить детали в чате": { uz: "Tafsilotlarni chatda muhokama qilish", en: "Discuss details in chat" },
  "Отменить запись": { uz: "Yozuvni bekor qilish", en: "Cancel booking" },
  "Пока нет клиентов.": { uz: "Hozircha mijozlar yo'q.", en: "No clients yet." },
  "Нет анкеты": { uz: "Anketa yo'q", en: "No questionnaire" },

  // Content / statistics
  "Добавить статью, запланировать вебинар и т.д.": {
    uz: "Maqola qo'shish, vebinar rejalashtirish va h.k.",
    en: "Add an article, schedule a webinar, and more.",
  },
  "Публикация материалов доступна на тарифе Premium для психологов.": {
    uz: "Materiallarni nashr etish Premium tarifida mavjud.",
    en: "Publishing content is available on the Premium plan for psychologists.",
  },
  "Узнать про Premium": { uz: "Premium haqida bilish", en: "Learn about Premium" },
  "Расширенная аналитика по вашим сессиям и клиентам": {
    uz: "Sessiyalaringiz va mijozlaringiz bo'yicha kengaytirilgan tahlil",
    en: "Advanced analytics on your sessions and clients",
  },
  "Доступно на тарифе Premium для психологов.": {
    uz: "Psixologlar uchun Premium tarifida mavjud.",
    en: "Available on the Premium plan for psychologists.",
  },

  // Premium / payment / about
  "Premium для психологов": { uz: "Psixologlar uchun Premium", en: "Premium for psychologists" },
  "Premium для клиентов": { uz: "Mijozlar uchun Premium", en: "Premium for clients" },
  "Подробнее о Premium": { uz: "Premium haqida batafsil", en: "More about Premium" },
  "Оформить Premium": { uz: "Premium rasmiylashtirish", en: "Get Premium" },
  "Оплата": { uz: "To'lov", en: "Payment" },
  "Оплатить через Rahmat": { uz: "Rahmat orqali to'lash", en: "Pay via Rahmat" },
  "Оплата консультаций происходит напрямую специалисту, вне платформы — мы не берём комиссию с сессий. Через платформу оплачивается только подписка": {
    uz: "Konsultatsiyalar uchun to'lov to'g'ridan-to'g'ri mutaxassisga, platformadan tashqarida amalga oshiriladi — biz sessiyalardan komissiya olmaymiz. Platforma orqali faqat obuna to'lanadi",
    en: "Payment for consultations goes directly to the specialist, outside the platform — we don't take a commission from sessions. Only the subscription is paid through the platform",
  },
  "Premium-подписка": { uz: "Premium-obuna", en: "Premium subscription" },
  "✓ Оплачено через Rahmat": { uz: "✓ Rahmat orqali to'landi", en: "✓ Paid via Rahmat" },
  "Платформа не заменяет врачебную помощь и не оказывает экстренную психиатрическую помощь.": {
    uz: "Platforma tibbiy yordamning o'rnini bosmaydi va shoshilinch psixiatrik yordam ko'rsatmaydi.",
    en: "The platform does not replace medical care and does not provide emergency psychiatric help.",
  },
  "Каждый психолог несёт персональную ответственность за качество и этичность своей консультационной практики.": {
    uz: "Har bir psixolog o'z konsultatsiya amaliyotining sifati va etikligi uchun shaxsan javobgardir.",
    en: "Each psychologist bears personal responsibility for the quality and ethics of their consulting practice.",
  },
  "Платформа предоставляет только техническое решение для поиска специалиста и коммуникации — оплата и оказание услуг происходят напрямую между клиентом и психологом.": {
    uz: "Platforma faqat mutaxassis topish va muloqot uchun texnik yechim taqdim etadi — to'lov va xizmat ko'rsatish mijoz va psixolog o'rtasida to'g'ridan-to'g'ri amalga oshiriladi.",
    en: "The platform only provides a technical solution for finding a specialist and communicating — payment and service delivery happen directly between the client and the psychologist.",
  },
  "Если вам нужна срочная помощь, воспользуйтесь разделом SOS или обратитесь на горячую линию.": {
    uz: "Agar sizga shoshilinch yordam kerak bo'lsa, SOS bo'limidan foydalaning yoki ishonch telefoniga murojaat qiling.",
    en: "If you need urgent help, use the SOS section or contact a hotline.",
  },
  "Важно знать": { uz: "Bilib qo'yish muhim", en: "Important to know" },
  "О платформе": { uz: "Platforma haqida", en: "About the platform" },
  "PRO-подписка": { uz: "PRO-obuna", en: "PRO subscription" },
  "Развивайте практику быстрее с расширенными инструментами": {
    uz: "Kengaytirilgan vositalar bilan amaliyotingizni tezroq rivojlantiring",
    en: "Grow your practice faster with advanced tools",
  },
  "Умный календарь и напоминания": { uz: "Aqlli kalendar va eslatmalar", en: "Smart calendar & reminders" },
  "Автоматические напоминания клиентам и синхронизация расписания.": {
    uz: "Mijozlarga avtomatik eslatmalar va jadval sinxronizatsiyasi.",
    en: "Automatic reminders for clients and schedule syncing.",
  },
  "Выход в ТОП и бейдж «Проверенный специалист»": {
    uz: "TOPga chiqish va «Tasdiqlangan mutaxassis» belgisi",
    en: "Top placement and a “Verified specialist” badge",
  },
  "Ваш профиль показывается выше в поиске.": {
    uz: "Profilingiz qidiruvda yuqorida ko'rsatiladi.",
    en: "Your profile is shown higher in search results.",
  },
  "Публикация статей, видео и блога": { uz: "Maqola, video va blog nashr etish", en: "Publish articles, videos & a blog" },
  "Делитесь экспертностью и привлекайте новых клиентов.": {
    uz: "Tajribangizni ulashing va yangi mijozlarni jalb qiling.",
    en: "Share your expertise and attract new clients.",
  },
  "Библиотека техник и шаблонов": { uz: "Texnika va shablonlar kutubxonasi", en: "Library of techniques & templates" },
  "Готовые материалы для работы с клиентами.": {
    uz: "Mijozlar bilan ishlash uchun tayyor materiallar.",
    en: "Ready-made materials for working with clients.",
  },
  "Расширенная аналитика": { uz: "Kengaytirilgan tahlil", en: "Advanced analytics" },
  "Статистика по сессиям, доходу и клиентам.": {
    uz: "Sessiyalar, daromad va mijozlar bo'yicha statistika.",
    en: "Statistics on sessions, income, and clients.",
  },
  "Трекеры и дневники": { uz: "Treker va kundaliklar", en: "Trackers & journals" },
  "Отслеживайте настроение и прогресс между сессиями.": {
    uz: "Sessiyalar orasida kayfiyat va progressni kuzating.",
    en: "Track your mood and progress between sessions.",
  },
  "AI-ассистент 24/7": { uz: "24/7 AI-yordamchi", en: "24/7 AI assistant" },
  "Поддержка и советы в любое время суток.": {
    uz: "Kunning istalgan vaqtida yordam va maslahatlar.",
    en: "Support and advice at any time of day.",
  },
  "Медитации и техники": { uz: "Meditatsiya va texnikalar", en: "Meditations & techniques" },
  "Библиотека практик для самостоятельной работы.": {
    uz: "Mustaqil ishlash uchun amaliyotlar kutubxonasi.",
    en: "A library of practices for self-guided work.",
  },
  "Вебинары и мини-курсы": { uz: "Vebinar va mini-kurslar", en: "Webinars & mini-courses" },
  "Обучающие материалы от специалистов платформы.": {
    uz: "Platforma mutaxassislaridan ta'lim materiallari.",
    en: "Educational content from platform specialists.",
  },
  "Приоритетная запись": { uz: "Ustuvor yozilish", en: "Priority booking" },
  "Бронируйте слоты у популярных специалистов первыми.": {
    uz: "Mashhur mutaxassislarga birinchilardan bo'lib yoziling.",
    en: "Be the first to book slots with popular specialists.",
  },
  "Больше инструментов для заботы о себе": {
    uz: "O'zingizga g'amxo'rlik qilish uchun ko'proq vositalar",
    en: "More tools for self-care",
  },

  // Common status words used across pages
  "Не найдено": { uz: "Topilmadi", en: "Not found" },
  "Клиент": { uz: "Mijoz", en: "Client" },
  "Специалист": { uz: "Mutaxassis", en: "Specialist" },
  "Zoom (ссылка появится за час до сессии)": {
    uz: "Zoom (havola sessiyadan bir soat oldin paydo bo'ladi)",
    en: "Zoom (link appears one hour before the session)",
  },
  "Zoom-ссылка активна за 1 час до начала": {
    uz: "Zoom havolasi boshlanishidan 1 soat oldin faollashadi",
    en: "Zoom link becomes active 1 hour before start",
  },
  "Формат уточняется": { uz: "Format aniqlanmoqda", en: "Format to be confirmed" },
  "Основная информация": { uz: "Asosiy ma'lumot", en: "Basic information" },
  "Опыт (лет)": { uz: "Tajriba (yil)", en: "Experience (years)" },
  "Специализация": { uz: "Mutaxassislik", en: "Specialization" },
  "Цена за сессию": { uz: "Sessiya narxi", en: "Price per session" },
  "Документы": { uz: "Hujjatlar", en: "Documents" },
  "Документы ещё не загружены.": { uz: "Hujjatlar hali yuklanmagan.", en: "No documents uploaded yet." },
  "Нет записей на эту дату.": { uz: "Bu sanada yozuvlar yo'q.", en: "No bookings on this date." },
};

export function translate(language: Language, ru: string): string {
  if (language === "ru") return ru;
  return DICT[ru]?.[language] ?? ru;
}

export function stepOfLabel(language: Language, step: number, total: number): string {
  if (language === "uz") return `${step}/${total}-qadam`;
  if (language === "en") return `Step ${step} of ${total}`;
  return `Шаг ${step} из ${total}`;
}

export function showSpecialistsLabel(language: Language, count: number): string {
  if (language === "uz") return `${count} ta mutaxassisni ko'rsatish`;
  if (language === "en") return `Show ${count} specialists`;
  return `Показать ${count} специалистов`;
}

export function priceUpToLabel(language: Language, priceStr: string): string {
  if (language === "uz") return `Sessiya narxi: ${priceStr} gacha`;
  if (language === "en") return `Price per session: up to ${priceStr}`;
  return `Цена за сессию: до ${priceStr}`;
}

export function bookingWithLabel(language: Language, name: string): string {
  if (language === "uz") return `${name} bilan yozilish`;
  if (language === "en") return `Book with ${name}`;
  return `Запись к ${name}`;
}

export function availableTimeOnLabel(language: Language, dateStr: string): string {
  if (language === "uz") return `Bo'sh vaqt: ${dateStr}`;
  if (language === "en") return `Available times on ${dateStr}`;
  return `Свободное время на ${dateStr}`;
}

export function appointmentsOnLabel(language: Language, dateStr: string): string {
  if (language === "uz") return `${dateStr} kunidagi yozuvlar`;
  if (language === "en") return `Bookings on ${dateStr}`;
  return `Записи на ${dateStr}`;
}

export function sessionInfoLabel(language: Language, dateTimeStr: string, formatText: string): string {
  if (language === "uz") return `Sessiya: ${dateTimeStr} · ${formatText}`;
  if (language === "en") return `Session: ${dateTimeStr} · ${formatText}`;
  return `Сессия: ${dateTimeStr} · ${formatText}`;
}

const MONTHS_BY_LANG: Record<Language, string[]> = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  uz: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const WEEKDAYS_BY_LANG: Record<Language, string[]> = {
  ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  uz: ["Du", "Se", "Cho", "Pa", "Ju", "Sh", "Ya"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
};

export function monthNames(language: Language): string[] {
  return MONTHS_BY_LANG[language];
}

export function weekdayShortNames(language: Language): string[] {
  return WEEKDAYS_BY_LANG[language];
}
