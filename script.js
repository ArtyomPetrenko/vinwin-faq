// VinWin FAQ — логика. Этап 4.

document.addEventListener('DOMContentLoaded', function () {

  // ─── Вспомогательные ────────────────────────────────────────────────────────

  var body = document.body;
  var modeToggle = document.getElementById('modeToggle');
  var modeLabel = modeToggle ? modeToggle.querySelector('.mode-label') : null;
  var categoryNav = document.getElementById('categoryNav');
  var mainSections = Array.prototype.slice.call(document.querySelectorAll('main section'));

  function getCurrentMode() {
    return body.classList.contains('mode-multi') ? 'multi' : 'single';
  }

  // ─── 1. Аккордеон ───────────────────────────────────────────────────────────

  function initAccordion() {
    var qaItems = document.querySelectorAll('.qa-item');

    Array.prototype.forEach.call(qaItems, function (item) {
      var btn = item.querySelector('.question');
      if (!btn) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        var section = item.closest('section');

        // Закрыть все открытые вопросы в этой секции
        if (section) {
          var siblings = section.querySelectorAll('.qa-item');
          Array.prototype.forEach.call(siblings, function (sibling) {
            if (sibling !== item && sibling.classList.contains('open')) {
              sibling.classList.remove('open');
              var sibBtn = sibling.querySelector('.question');
              if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
            }
          });
        }

        // Тогл текущего
        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ─── 4. Активация секции в multi-режиме ─────────────────────────────────────

  function setActiveSection(id) {
    // Снять active со всех секций
    Array.prototype.forEach.call(mainSections, function (section) {
      section.classList.remove('active');
    });

    // Снять active со всех nav-ссылок
    if (categoryNav) {
      var navLinks = categoryNav.querySelectorAll('a');
      Array.prototype.forEach.call(navLinks, function (link) {
        link.classList.remove('active');
      });
    }

    // Добавить active на нужную секцию
    var targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Добавить active на соответствующую nav-ссылку
    if (categoryNav) {
      var targetLink = categoryNav.querySelector('a[href="#' + id + '"]');
      if (targetLink) {
        targetLink.classList.add('active');
      }
    }
  }

  // ─── 5. Nav в multi-режиме ──────────────────────────────────────────────────

  function initNav() {
    if (!categoryNav) return;

    var navLinks = categoryNav.querySelectorAll('a');
    Array.prototype.forEach.call(navLinks, function (link) {
      link.addEventListener('click', function (e) {
        if (getCurrentMode() === 'multi') {
          e.preventDefault();
          var href = link.getAttribute('href');
          if (href && href.charAt(0) === '#') {
            setActiveSection(href.slice(1));
          }
        }
        // single — стандартный якорный скролл, ничего не делаем
      });
    });
  }

  // ─── 3. Нахождение ближайшей к верху секции ─────────────────────────────────

  function findNearestSection() {
    var best = null;
    var bestTop = null;

    Array.prototype.forEach.call(mainSections, function (section) {
      var top = section.getBoundingClientRect().top;

      if (bestTop === null) {
        best = section;
        bestTop = top;
        return;
      }

      if (top >= 0) {
        // Неотрицательный — выбираем наименьший неотрицательный
        if (bestTop < 0 || top < bestTop) {
          best = section;
          bestTop = top;
        }
      } else {
        // Отрицательный — выбираем только если все предыдущие тоже отрицательные
        // и этот «наибольший» (ближайший к 0)
        if (bestTop < 0 && top > bestTop) {
          best = section;
          bestTop = top;
        }
      }
    });

    return best;
  }

  // ─── 2. Переключатель режимов ────────────────────────────────────────────────

  function updateModeLabel() {
    if (!modeLabel) return;
    if (getCurrentMode() === 'multi') {
      modeLabel.textContent = 'Режим: по категориям';
    } else {
      modeLabel.textContent = 'Режим: одна страница';
    }
  }

  function initModeToggle() {
    if (!modeToggle) return;

    modeToggle.addEventListener('click', function () {
      var mode = getCurrentMode();

      if (mode === 'single') {
        // single → multi
        var nearestSection = findNearestSection();
        var targetId = nearestSection ? nearestSection.id : (mainSections[0] ? mainSections[0].id : null);

        body.classList.remove('mode-single');
        body.classList.add('mode-multi');
        updateModeLabel();

        if (targetId) {
          setActiveSection(targetId);
        }

      } else {
        // multi → single
        var activeSection = document.querySelector('main section.active');
        var activeSectionId = activeSection ? activeSection.id : null;

        body.classList.remove('mode-multi');
        body.classList.add('mode-single');
        updateModeLabel();

        if (activeSectionId) {
          var target = document.getElementById(activeSectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }

  // ─── 6. Якорь при загрузке страницы ────────────────────────────────────────

  function handleInitialHash() {
    var hash = window.location.hash;
    if (!hash) return;

    var id = hash.slice(1); // убрать '#'

    // Проверяем: это qa-item?
    var qaItem = document.getElementById(id);
    if (qaItem && qaItem.classList.contains('qa-item')) {
      qaItem.classList.add('open');
      var btn = qaItem.querySelector('.question');
      if (btn) btn.setAttribute('aria-expanded', 'true');

      setTimeout(function () {
        qaItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    // Проверяем: это section?
    var sectionEl = document.getElementById(id);
    if (sectionEl && sectionEl.tagName === 'SECTION') {
      if (getCurrentMode() === 'multi') {
        setActiveSection(id);
      }
    }
  }

  // ─── 7. Инициализация ───────────────────────────────────────────────────────

  initAccordion();
  initNav();
  initModeToggle();

  // Если уже mode-multi — активировать первую секцию
  if (getCurrentMode() === 'multi' && mainSections.length > 0) {
    setActiveSection(mainSections[0].id);
  }

  updateModeLabel();
  handleInitialHash();

});
