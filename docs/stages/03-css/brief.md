# Этап 3 — CSS / Дизайн

## Контекст проекта

VinWin FAQ — статический сайт про нейросети для новичков. Стиль: лёгкий, дружелюбный, читаемый.  
Desktop-first; на мобиле не ломается, но не оптимизируется специально.  
Два режима: `body.mode-single` (одна страница) и `body.mode-multi` (по категориям).  
Класс на `<body>` переключается JS-ом (этап 4). CSS должен обрабатывать оба режима.

Файл: `/Users/undo/VinWin/style.css`  
HTML-структура описана в [../02-html/brief.md](../02-html/brief.md).

## Дизайн-токены

```css
/* Цвета */
--color-bg:        #ffffff
--color-text:      #1a1a1a
--color-secondary: #555555
--color-accent:    #4A90D9
--color-accent-hover: #357ABD
--color-border:    #e5e5e5
--color-bg-hover:  #f5f8fd

/* Типографика */
--font: -apple-system, "Segoe UI", Roboto, sans-serif
--font-size-base: 17px
--line-height: 1.65

/* Размеры */
--max-width: 760px
--radius: 8px
--gap: 1.5rem
```

## Что нужно написать в `style.css`

### 1. Reset и base

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  color: var(--color-text);
  background: var(--color-bg);
}

a { color: var(--color-accent); text-decoration: none; }
a:hover { text-decoration: underline; }
```

### 2. Header

- Полная ширина, белый фон, тонкая нижняя граница
- Внутри `.header-inner`: flex, space-between, max-width контента, центрирован
- `.site-title`: полужирный, без подчёркивания, цвет текста (не accent)
- `.mode-toggle`: кнопка-таблетка с рамкой цвета accent, hover меняет фон

### 3. Nav

- Горизонтальный список ссылок, gap между ними
- Центрирован, max-width, padding вертикальный
- Ссылки: таблетки с лёгким фоном на hover

### 4. Main / секции

- `max-width: 760px`, `margin: 0 auto`, `padding: 2rem 1rem`
- `<section>` + `gap` между секциями
- `<h2>` секции: чуть крупнее, полужирный, с нижним отступом

### 5. Аккордеон (`.qa-item`, `.question`, `.answer`)

```
.qa-item
  border: 1px solid --color-border
  border-radius: --radius
  overflow: hidden
  margin-bottom: 0.75rem

.question
  width: 100%
  text-align: left
  background: white
  border: none
  padding: 1rem 1.25rem
  font-size: inherit
  cursor: pointer
  display: flex
  justify-content: space-between
  align-items: center
  gap: 1rem

  /* стрелка справа через псевдоэлемент ::after: ▾ → ▴ при expanded */

.question:hover
  background: --color-bg-hover

.answer
  padding: 0 1.25rem
  max-height: 0
  overflow: hidden
  transition: max-height 0.25s ease, padding 0.25s ease
  color: --color-secondary

.qa-item.open .answer
  max-height: 600px      /* достаточно большое */
  padding: 0.75rem 1.25rem 1.25rem

.qa-item.open .question
  font-weight: 600
```

### 6. Режим `mode-multi`

В multi-режиме секции переключаются как вкладки — только одна `<section>` видна за раз.

```css
/* По умолчанию (mode-single) — все секции видны */
body.mode-single section { display: block; }

/* В mode-multi — все секции скрыты, кроме активной */
body.mode-multi section { display: none; }
body.mode-multi section.active { display: block; }
```

Nav в mode-multi: активная категория выделена (класс `.active` на ссылке).

### 7. Кнопка режима — состояния

```css
/* текст меняется через JS: «Режим: одна страница» / «Режим: по категориям» */
.mode-toggle { /* таблетка */ }
body.mode-multi .mode-toggle { /* другой фон или рамка */ }
```

### 8. Базовый responsive

```css
@media (max-width: 600px) {
  .header-inner { flex-direction: column; gap: 0.75rem; align-items: flex-start; }
  main { padding: 1rem 0.75rem; }
}
```

## Критерий готовности

- [ ] Страница выглядит законченно в Chrome (desktop)
- [ ] Аккордеон визуально понятен (стрелка, hover-состояние)
- [ ] При добавлении класса `mode-multi` на `<body>` вручную через DevTools — секции скрываются
- [ ] При добавлении класса `active` на `<section>` — она появляется
- [ ] На ширине 375px ничего не обрезается горизонтально
