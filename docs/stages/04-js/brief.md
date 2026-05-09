# Этап 4 — JavaScript

## Контекст проекта

VinWin FAQ — статический сайт, чистый Vanilla JS (никаких библиотек).  
HTML-структура и CSS уже готовы (этапы 2–3).  
Файл: `/Users/undo/VinWin/script.js`

## Три функциональных блока

---

### 1. Аккордеон

**Как работает:**
- Клик по `.question` → тоггл класса `open` на родительском `.qa-item`
- `aria-expanded` меняется синхронно
- Одновременно открыт только один вопрос в каждой `<section>` (остальные закрываются)

```js
function initAccordion() {
  document.querySelectorAll('.question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.qa-item');
      const section = btn.closest('section');
      const isOpen = item.classList.contains('open');

      // закрыть все в этой секции
      section.querySelectorAll('.qa-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.question').setAttribute('aria-expanded', 'false');
      });

      // открыть текущий (если был закрыт)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
```

---

### 2. Переключатель режимов

**Два режима:**
- `single` — класс `mode-single` на `<body>`, все секции видны
- `multi` — класс `mode-multi` на `<body>`, видна только секция с классом `active`

**Логика переключения:**

```js
const MODES = { SINGLE: 'mode-single', MULTI: 'mode-multi' };
const LABELS = { single: 'Режим: одна страница', multi: 'Режим: по категориям' };

function getCurrentMode() {
  return document.body.classList.contains(MODES.MULTI) ? 'multi' : 'single';
}

function switchMode() {
  const current = getCurrentMode();
  const next = current === 'single' ? 'multi' : 'single';

  // сохранить позицию перед переключением
  const anchor = current === 'single' ? getVisibleSection() : getActiveSection();

  // переключить класс
  document.body.classList.remove(MODES[current.toUpperCase()]);
  document.body.classList.add(MODES[next.toUpperCase()]);

  // обновить label кнопки
  document.querySelector('.mode-label').textContent = LABELS[next];

  // восстановить позицию
  if (next === 'multi') {
    setActiveSection(anchor);
  } else {
    scrollToSection(anchor);
  }
}

document.getElementById('modeToggle').addEventListener('click', switchMode);
```

---

### 3. Сохранение позиции при переключении

#### `getVisibleSection()` — single → multi

Определяет, какая секция сейчас в viewport:

```js
function getVisibleSection() {
  const sections = document.querySelectorAll('main section');
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      // продолжаем, берём последнюю подходящую
      var found = section.id;
    }
  }
  return found || sections[0].id;
}
```

#### `getActiveSection()` — multi → single

```js
function getActiveSection() {
  const active = document.querySelector('main section.active');
  return active ? active.id : document.querySelector('main section').id;
}
```

#### `setActiveSection(id)` — активировать секцию в multi-режиме

```js
function setActiveSection(id) {
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#categoryNav a').forEach(a => a.classList.remove('active'));

  const section = document.getElementById(id);
  if (section) section.classList.add('active');

  const link = document.querySelector(`#categoryNav a[href="#${id}"]`);
  if (link) link.classList.add('active');
}
```

#### `scrollToSection(id)` — прокрутить к секции в single-режиме

```js
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

---

### 4. Nav в multi-режиме

Клик по ссылке в nav → переключает активную секцию (не перезагружает страницу):

```js
function initNav() {
  document.querySelectorAll('#categoryNav a').forEach(link => {
    link.addEventListener('click', e => {
      if (getCurrentMode() === 'multi') {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        setActiveSection(id);
      }
      // в single-режиме — стандартный якорный скролл
    });
  });
}
```

---

### 5. Якорь при загрузке страницы

Если URL содержит `#id` → открыть нужный вопрос и прокрутить к нему:

```js
function handleInitialHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const item = document.getElementById(hash);
  if (!item) return;

  if (item.classList.contains('qa-item')) {
    // это вопрос — открыть его
    item.classList.add('open');
    item.querySelector('.question').setAttribute('aria-expanded', 'true');
    setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  } else if (item.tagName === 'SECTION') {
    // это категория — в multi-режиме показать её
    if (getCurrentMode() === 'multi') setActiveSection(hash);
  }
}
```

---

### 6. Инициализация

```js
document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initNav();

  // в multi-режиме по умолчанию активна первая секция
  if (getCurrentMode() === 'multi') {
    const first = document.querySelector('main section');
    if (first) setActiveSection(first.id);
  }

  handleInitialHash();
});
```

---

## Критерий готовности

- [ ] Клик по вопросу открывает/закрывает ответ
- [ ] Открытие одного вопроса закрывает другой в той же секции
- [ ] Кнопка режима переключает классы на `<body>`
- [ ] При переключении `single → multi` видна та категория, которая была в viewport
- [ ] При переключении `multi → single` страница прокручивается к нужной секции
- [ ] URL с якорём `#q-llm` открывает и разворачивает нужный вопрос
- [ ] Nav в multi-режиме переключает секции без перезагрузки
