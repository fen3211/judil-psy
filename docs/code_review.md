# Отчёт о независимом аудите кода и безопасности (LIVING CANVAS)

**Проект:** JUDIL.PSY (Персональный терапевтический журнал психолога)  
**Репозиторий:** `d:\Projects\judil-psy`  
**Дата аудита:** 06 ноября 2026 г.  
**Аудитор:** Principal Code Reviewer & Security Auditor  
**Архитектурная концепция:** LIVING CANVAS (Живой холст, акварельные пигменты, zero-form)  
**Статус:** `CHANGES REQUESTED` (Код готов к релизу после исправления 2 Major замечаний по rAF и доступности клавиатуры)

---

## 1. Сводка результатов аудита

Проведён независимый аудит кодовой базы после перехода на концепцию LIVING CANVAS. Проверены все ключевые компоненты, анимации, холсты Canvas 2D, SVG-разделители, модальные окна, типизация TypeScript и профили безопасности.

| Категория проверки | Статус | Кол-во дефектов | Оценка |
| :--- | :---: | :---: | :---: |
| **1. Производительность (Performance & rAF)** | ⚠️ Замечания | 2 (1 Major, 1 Minor) | 8.5 / 10 |
| **2. Доступность интерфейса (Accessibility / a11y)** | ⚠️ Замечания | 3 (1 Major, 2 Minor) | 8.0 / 10 |
| **3. Строгая типизация TypeScript** | ✅ Идеально | 0 дефектов | 10 / 10 |
| **4. Безопасность и комплаенс (OWASP, 152-ФЗ, 323-ФЗ)** | ✅ Идеально | 0 дефектов | 10 / 10 |
| **5. SVG, верстка и дизайн-система** | ℹ️ Рекомендации | 1 Minor | 9.0 / 10 |

**Итоговый балл надежности:** **9.1 / 10**

---

## 2. Детальный разбор выявленных проблем и рисков

### 🔴 MAJOR ISSUES (Требуют исправления)

#### Issue M-1: Бесконечный холостой цикл `requestAnimationFrame` при отсутствии частиц
- **Файл:** [`src/components/ButterflyCursor.tsx`](file:///d:/Projects/judil-psy/src/components/ButterflyCursor.tsx#L171-L198)
- **Механизм бага:**
  Функция `render()` непрерывно планирует следующий кадр через `animationId = requestAnimationFrame(render);` даже в состоянии покоя, когда массив `butterflies.length === 0`:
  ```typescript
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = butterflies.length - 1; i >= 0; i--) {
      // обновление и отрисовка бабочек
    }
    animationId = requestAnimationFrame(render); // Вызывается КАЖДЫЙ кадр 60-144 Гц вхолостую!
  };
  ```
- **Последствия и риски:**
  Даже когда пользователь не шевелит мышью или просто читает страницу, браузер выполняет очистку полноэкранного холста (`ctx.clearRect(0, 0, width, height)`) 60–120 раз в секунду. Это приводит к непрерывному пробуждению GPU/CPU, повышенному энергопотреблению и разряду батареи на мобильных устройствах и ноутбуках.
- **Решение:**
  Запускать цикл `requestAnimationFrame` только при наличии активных частиц (`butterflies.length > 0`), а при опустошении массива очищать холст один раз и останавливать цикл до следующего события `spawnButterfly`:
  ```typescript
  let isRunning = false;

  const startLoop = () => {
    if (!isRunning) {
      isRunning = true;
      animationId = requestAnimationFrame(render);
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = butterflies.length - 1; i >= 0; i--) {
      // update & draw
    }
    if (butterflies.length > 0) {
      animationId = requestAnimationFrame(render);
    } else {
      isRunning = false;
    }
  };

  // В spawnButterfly():
  butterflies.push(...);
  startLoop();
  ```

---

#### Issue M-2: Интерактивные карточки заметок недоступны для клавиатурной навигации
- **Файл:** [`src/components/InteractiveNotesSection.tsx`](file:///d:/Projects/judil-psy/src/components/InteractiveNotesSection.tsx#L48-L50) и [L98-L105](file:///d:/Projects/judil-psy/src/components/InteractiveNotesSection.tsx#L98-L105)
- **Механизм бага:**
  Главная статья (`featuredNote`) обёрнута в `motion.div`, а карточки галереи (`gridNotes`) — в `motion.article`. На них навешан обработчик клика мыши:
  ```tsx
  <motion.article
    key={note.id}
    onClick={() => setSelectedNote(note)}
    className="... cursor-pointer group ..."
  >
  ```
  При этом у элементов отсутствуют:
  1. `tabIndex={0}` — элемент невозможно выбрать клавишей `Tab`.
  2. `role="button"` — скринридер не сообщает пользователю, что карточка кликабельна и открывает модальное окно.
  3. Обработчик `onKeyDown` (активация по клавишам `Enter` / `Space`).
- **Последствия и риски:**
  Нарушение базового стандарта доступности **WCAG 2.1 Success Criterion 2.1.1 (Keyboard Accessible)**. Пользователи, использующие экранные дикторы, клавиатуру или альтернативные устройства ввода, физически не могут открыть ни одну заметку из дневника.
- **Решение:**
  Добавить атрибуты доступности и обработку клавиатурных событий:
  ```tsx
  <motion.article
    key={note.id}
    role="button"
    tabIndex={0}
    onClick={() => setSelectedNote(note)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelectedNote(note);
      }
    }}
    className="... cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ..."
  >
  ```

---

### 🟡 MINOR ISSUES (Качество кода, A11y и оптимизация)

#### Issue Min-1: Ловушка фокуса (Focus Trap) в модальном окне `NoteModal`
- **Файл:** [`src/components/NoteModal.tsx`](file:///d:/Projects/judil-psy/src/components/NoteModal.tsx#L42-L51)
- **Механизм:**
  Модальное окно содержит корректные атрибуты `role="dialog"`, `aria-modal="true"`, `aria-labelledby="note-modal-title"` и закрывается по `Escape`. Однако при открытии модального окна фокус браузера не переводится автоматически на кнопку закрытия или контейнер диалога, а при нажатии клавиши `Tab` фокус может уйти на скрытые под оверлеем элементы страницы.
- **Решение:**
  При открытии модалки программно фокусировать кнопку закрытия (`closeButtonRef.current?.focus()`), а при закрытии возвращать фокус на карточку, которая вызвала открытие.

---

#### Issue Min-2: Отсутствие поддержки Retina/HiDPI дисплеев в Canvas бабочек
- **Файл:** [`src/components/ButterflyCursor.tsx`](file:///d:/Projects/judil-psy/src/components/ButterflyCursor.tsx#L43-L50)
- **Механизм:**
  Размер буфера холста задаётся без учёта плотности пикселей:
  ```typescript
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ```
  На экранах с плотностью Retina (`devicePixelRatio: 2` или `3`, MacBook, 4K мониторы, современные смартфоны) растровая графика Canvas масштабируется браузером в 2-3 раза, из-за чего тонкие акварельные крылья бабочек теряют чёткость.
- **Решение:**
  Умножать физический размер буфера на `dpr = Math.min(window.devicePixelRatio || 1, 2)` и масштабировать контекст через `ctx.scale(dpr, dpr)`.

---

#### Issue Min-3: Потенциальная коллизия SVG `id` градиентов в `InkBloomDivider`
- **Файл:** [`src/components/InkBloomDivider.tsx`](file:///d:/Projects/judil-psy/src/components/InkBloomDivider.tsx#L48)
- **Механизм:**
  Идентификатор градиента формируется детерминированно:
  ```typescript
  const uniqueId = `ink-grad-${color}-${flip ? 'flip' : 'normal'}`;
  ```
  Если на одной странице рендерятся два разделителя с одинаковыми параметрами (например, два разделителя с цветом `neutral`), в DOM-дереве появляются дублирующиеся SVG ID: `<linearGradient id="ink-grad-neutral-normal">`.
- **Решение:**
  Использовать стандартный хук React 18 `useId()`:
  ```typescript
  import React, { useId } from 'react';
  // ...
  const reactId = useId();
  const uniqueId = `ink-grad-${color}-${reactId.replace(/:/g, '')}`;
  ```

---

#### Issue Min-4: Динамическое отслеживание `prefers-reduced-motion`
- **Файл:** [`src/components/ButterflyCursor.tsx`](file:///d:/Projects/judil-psy/src/components/ButterflyCursor.tsx#L32-L34)
- **Механизм:**
  Проверка настройки пониженного движения выполняется один раз при монтировании компонента:
  ```typescript
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  ```
  Если пользователь переключает настройку в системе в процессе сессии, состояние Canvas не адаптируется. Рекомендуется подписаться на событие `change` через `mediaQuery.addEventListener('change', ...)`.

---

## 3. Проверка безопасности и соответствия законодательству (PASS)

1. **Безопасность внешних ссылок (OWASP reverse tabnabbing):**
   - Все 19 внешних ссылок проекта (Telegram, Instagram, Telegram-посты) имеют обязательные атрибуты:
     `target="_blank"` и `rel="noopener noreferrer"`.
   - Риск захвата родительской вкладки полностью исключён.

2. **Архитектура без сбора персональных данных (Zero-Form Architecture / 152-ФЗ РФ):**
   - Проверено наличие тегов `<form>`, `<input>`, `<textarea>` — **0 вхождений**.
   - Клиентские данные не запрашиваются, не валидируются и не отправляются на сервер.
   - Запись на консультации делегирована напрямую в Telegram через защищённый диалог с психологом (`@Judildan`).

3. **Соблюдение медицинского законодательства (323-ФЗ РФ):**
   - В блоках [`TelegramCTA.tsx`](file:///d:/Projects/judil-psy/src/components/TelegramCTA.tsx#L101-L107), [`PricingSection.tsx`](file:///d:/Projects/judil-psy/src/components/PricingSection.tsx#L105-L107), [`Footer.tsx`](file:///d:/Projects/judil-psy/src/components/Footer.tsx#L134) и [`LegalModal.tsx`](file:///d:/Projects/judil-psy/src/components/LegalModal.tsx#L83-L87) размещены исчерпывающие дисклеймеры о немедицинском характере услуг и телефоны кризисных линий РФ (8-800-200-01-22).

4. **Антиэкстремистская маркировка Meta Platforms Inc.:**
   - Ссылка на Instagram в `Footer.tsx` (L125) и `LegalModal.tsx` (L101) снабжена обязательной звёздочкой и дисклеймером о признании Meta Platforms Inc. экстремистской организацией в РФ.

---

## 4. Проверка строгости TypeScript

- Режим компилятора: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true` в `tsconfig.app.json`.
- Поиск типа `any`: **0 совпадений** во всей директории `src/`.
- Сборка `npm run build` (`tsc -b && vite build`): проходит успешно, без ошибок компиляции и сборки (время билда: 3.77с, размер бандла: 109 kB gzip).

---

## 5. План устранения замечаний для разработчика

1. **[M-1] Оптимизация rAF в `ButterflyCursor.tsx`:** Запускать `requestAnimationFrame` только при наличии бабочек в массиве, останавливать при пустом массиве.
2. **[M-2] Клавиатурная доступность в `InteractiveNotesSection.tsx`:** Добавить `role="button"`, `tabIndex={0}` и обработчик клавиш `Enter`/`Space` на карточки заметок.
3. **[Min-1] Фокус в `NoteModal.tsx`:** Фокусировать модальное окно при открытии.
4. **[Min-2] Retina HiDPI в `ButterflyCursor.tsx`:** Добавить масштабирование с учётом `window.devicePixelRatio`.
5. **[Min-3] Идентификаторы в `InkBloomDivider.tsx`:** Использовать `useId()` для предотвращения дублирования SVG градиентов.