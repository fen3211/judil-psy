# JUDIL.PSY — Living Canvas: Interactive Painterly Digital Experience

> **Персональное цифровое художественное пространство психолога Юлии Колесниковой (JUDIL.PSY)**  
> 🔗 **Live Demo (GitHub Pages)**: [https://fen3211.github.io/judil-psy/](https://fen3211.github.io/judil-psy/)  
> 💬 **Прямая запись на консультацию**: [https://t.me/Judildan](https://t.me/Judildan)  
> 📖 **Telegram-канал**: [«Терапия с трепетом 🫂»](https://t.me/terapia_s_trepetom)

---

## 1. Концепция: Living Canvas

Сайт соединяет современный веб-дизайн, интерактивную галерею и живые живописные техники: акварель, гуашь, пастель и чернильную графику:
1. **Paint Reveal (Hero Section)**: органическое растекание акварели (`post_324_3.jpg`), проявляющее подлинный портрет психолога.
2. **Butterfly Cursor (`ButterflyCursor.tsx`)**: 4 уникальных вида бабочек с характерной геометрией крыльев, синусоидальным взмахом, деликатным парением при паузе и аппаратным ускорением Retina DPR.
3. **Living Ink Canvas (`LivingInkCanvas.tsx`)**: физическая модель жидких пигментов на основе пружинного закона Гука, реагирующая на возмущение курсора в секции проблем.
4. **Interactive Painting Atelier (`InteractivePainting.tsx`)**: интерактивная акварельная глазурь с радиальным смыванием краски (`destination-out`) курсором или касанием.
5. **Ink Bloom Dividers (`InkBloomDivider.tsx`)**: органические капиллярные переходы между разделами с уникальными SVG-градиентами через `useId()`.
6. **Ink Writing & Brush Typography (`CalligraphicInkLine.tsx` & `QuotesSection.tsx`)**: живая каллиграфическая прорисовка `stroke-dashoffset` и тактильные мазки гуаши.
7. **Colorful Navigation (`Header.tsx`)**: меню с цветными точками пигментов, расцветающими при наведении.
8. **Строгий инвариант Zero-Form**: 100% целевых действий ведут напрямую в Telegram Юлии ([`https://t.me/Judildan`](https://t.me/Judildan)), исключая формы сбора контактов и снижая барьер первого шага.

---

## 2. Архитектура и стек технологий

- **Среда**: Node.js v24+, Vite 6, TypeScript 5.7
- **UI & Рендеринг**: React 18, Tailwind CSS v3.4 (семантические токены: Parchment `#fefffc`, Paper `#ffffff`, Mist `#dee2de`, Ink `#171717`, Graphite `#2c2c2c`, Sage `#728373`, Terracotta `#c26e55`)
- **Анимации & Интерактив**: `framer-motion` v11 (spring physics, mouse parallax, scroll reveals, AnimatePresence modal)
- **Иконки**: `lucide-react`
- **Микроинтеракции**: `canvas-confetti` при успешной отправке заявки

---

## 3. Структура проекта

```
d:/Projects/judil-psy/
├── data/                      # Структурированные архивы и каталоги
│   ├── telegram_archive.json  # 144 поста Telegram-канала с метаданными
│   ├── verified_quotes.json   # Каталог проверенных цитат
│   ├── verified_quotes.md     # Таблица цитат с прямыми ссылками
│   ├── curated_photos.json    # Реестр отобранных фотографий
│   ├── curated_photos.md      # Описание и роли всех фотографий
│   ├── psychologist_profile.json # Профиль специалиста и условия
│   └── photos/                # 162 оригинальные фотографии из Telegram
├── design/
│   └── design_system.md       # Полная спецификация дизайн-системы (UI/UX)
├── docs/
│   ├── legal_compliance.md    # Юридическое заключение Gate 2b (152-ФЗ, 323-ФЗ)
│   └── qa_report.md           # Отчёт о независимом тестировании
├── public/
│   ├── favicon.svg            # Векторная иконка сайта
│   └── photos/                # Статические фотографии для веба
├── src/
│   ├── components/            # UI-компоненты всех секций
│   │   ├── Header.tsx         # Плавающий навигационный пилл + мобильное меню
│   │   ├── HeroSection.tsx    # Живая обложка с 3D-параллаксом
│   │   ├── AboutSection.tsx   # Блок знакомства, образование, АКПП
│   │   ├── ProblemsSection.tsx# 5 направлений работы + аккордеон решений
│   │   ├── InteractiveNotesSection.tsx # Карточки заметок с наклоном
│   │   ├── QuotesSection.tsx  # Типографическая анимация цитат
│   │   ├── ProcessSection.tsx # 4 шага консультации
│   │   ├── PricingSection.tsx # Формат и стоимость (2500 ₽, 55 мин)
│   │   ├── FaqSection.tsx     # Часто задаваемые вопросы
│   │   ├── BookingSection.tsx # Форма записи + переход в Telegram
│   │   ├── Footer.tsx         # Футер с реквизитами и дисклеймерами
│   │   ├── NoteModal.tsx      # Модальное окно чтения заметок
│   │   └── LegalModal.tsx     # Модальное окно политики конфиденциальности
│   ├── data/                  # Модули данных (профиль, цитаты, заметки, FAQ)
│   ├── types/                 # TypeScript интерфейсы
│   ├── utils/                 # Утилиты (cn, motion)
│   ├── App.tsx                # Корневой компонент страницы
│   ├── index.css              # Базовые стили, зерно бумаги, скроллбар
│   └── main.tsx               # Входная точка приложения
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Запуск и сборка

### Разработка
```bash
npm run dev
# Сервер запустится на http://localhost:5173
```

### Сборка для продакшена
```bash
npm run build
# Проверка типов tsc и сборка в dist/
```

### Локальный просмотр сборки
```bash
npm run preview
# Просмотр оптимизированной сборки на http://localhost:4173
```

---

## 5. Контакты психолога

- **Канал в Telegram**: [@terapia_s_trepetom](https://t.me/terapia_s_trepetom)
- **Личный контакт для записи**: [@Judildan](https://t.me/Judildan)
- **Instagram**: [@judil.psy](https://instagram.com/judil.psy/)
- **Исходная страница Taplink**: [taplink.cc/judil.psy](https://taplink.cc/judil.psy)
