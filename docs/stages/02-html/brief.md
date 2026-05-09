# Этап 2 — HTML-структура

## Контекст проекта

VinWin FAQ — статический сайт, чистый HTML + CSS + JS, без фреймворков.  
Аудитория: полные новички. Язык: русский.  
Два режима отображения (управляются JS/CSS на этапах 3–4), но вся разметка — одна, в `index.html`.

Рабочая директория: `/Users/undo/VinWin`  
Предыдущий этап: скелет `index.html` уже создан с `<body class="mode-single">`.

## Что нужно сделать

Заполнить `index.html` полной разметкой. Контент — заглушки (реальные тексты будут на этапе 5).

### Структура страницы

```
<header>          — название сайта + кнопка переключения режима
<nav>             — якорные ссылки на категории
<main>
  <section>       — категория «Что такое»
    <div.qa-item> — вопрос + ответ (повторяется)
  <section>       — категория «Ограничения и мифы»
    <div.qa-item> — вопрос + ответ (повторяется)
```

### Полная разметка `index.html`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VinWin FAQ — нейросети простыми словами</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="mode-single">

  <header>
    <div class="header-inner">
      <a href="#" class="site-title">VinWin FAQ</a>
      <button class="mode-toggle" id="modeToggle" aria-label="Переключить режим отображения">
        <span class="mode-label">Режим: одна страница</span>
      </button>
    </div>
  </header>

  <nav id="categoryNav">
    <a href="#chto-takoe">Что такое</a>
    <a href="#mify">Ограничения и мифы</a>
  </nav>

  <main>

    <section id="chto-takoe">
      <h2>Что такое</h2>

      <div class="qa-item" id="q-neyroseti">
        <button class="question" aria-expanded="false">
          Что такое нейронная сеть?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-llm">
        <button class="question" aria-expanded="false">
          Что такое LLM?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-token">
        <button class="question" aria-expanded="false">
          Что такое токен?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-context">
        <button class="question" aria-expanded="false">
          Что такое контекстное окно?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-vs-search">
        <button class="question" aria-expanded="false">
          Чем LLM отличается от поиска?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

    </section>

    <section id="mify">
      <h2>Ограничения и мифы</h2>

      <div class="qa-item" id="q-thinks">
        <button class="question" aria-expanded="false">
          Нейронка «думает» как человек?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-lies">
        <button class="question" aria-expanded="false">
          Почему она иногда врёт?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-internet">
        <button class="question" aria-expanded="false">
          Нейронка знает всё из интернета?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

      <div class="qa-item" id="q-memory">
        <button class="question" aria-expanded="false">
          Нейронка запоминает наши разговоры?
        </button>
        <div class="answer">
          <p>Заглушка ответа.</p>
        </div>
      </div>

    </section>

  </main>

  <script src="script.js"></script>
</body>
</html>
```

## Критерий готовности

- [ ] Страница открывается без ошибок в консоли браузера
- [ ] Присутствуют обе секции с корректными `id` (`chto-takoe`, `mify`)
- [ ] У каждого вопроса есть уникальный `id` на `.qa-item`
- [ ] Кнопка режима есть в header
- [ ] Якорные ссылки в `<nav>` ведут на секции
- [ ] `aria-expanded="false"` на всех кнопках вопросов
