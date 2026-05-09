# Этап 1 — Git и скелет проекта

## Контекст проекта

VinWin FAQ — статический сайт на чистом HTML + CSS + Vanilla JS, хостинг на GitHub Pages.  
Сайт отвечает на базовые вопросы про нейросети и LLM для полных новичков.  
Zero-pipeline: никакого build-шага, никаких npm-пакетов.

Рабочая директория: `/Users/undo/VinWin`

## Что нужно сделать

### 1. Git

```bash
cd /Users/undo/VinWin
git init
git branch -M main
```

### 2. Создать файлы

Создать три файла в корне `/Users/undo/VinWin/`:

**`index.html`** — базовый скелет:
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
  <!-- контент будет на этапе 2 -->
  <script src="script.js"></script>
</body>
</html>
```

**`style.css`** — пустой файл с комментарием-заглушкой:
```css
/* VinWin FAQ — стили. Этап 3. */
```

**`script.js`** — пустой файл с комментарием-заглушкой:
```js
// VinWin FAQ — логика. Этап 4.
```

### 3. .gitignore

Создать `.gitignore`:
```
.DS_Store
```

### 4. Первый коммит

```bash
git add index.html style.css script.js .gitignore README.md docs/
git commit -m "init: project skeleton"
```

## Критерий готовности

- [ ] `git log` показывает хотя бы один коммит
- [ ] Все три файла существуют в корне
- [ ] `open index.html` открывает пустую страницу без ошибок в консоли
