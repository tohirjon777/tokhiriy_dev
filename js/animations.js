/**
 * Animations & Motion Controller for Tohirjon Obidov's Portfolio
 * High performance, zero bloat, clean micro-interactions.
 */

(function () {
  'use strict';

  const HERO_CATEGORIES = {
    uz: [
      'Web saytlar',
      'Mobil ilovalar',
      'Telegram botlar',
      'AI yechimlar',
      'Biznes avtomatizatsiyasi',
      'Startup MVP\'lar'
    ],
    ru: [
      'Веб-сайты',
      'Мобильные приложения',
      'Telegram-боты',
      'AI-решения',
      'Автоматизация бизнеса',
      'Startup MVP'
    ],
    en: [
      'Websites',
      'Mobile Apps',
      'Telegram Bots',
      'AI Solutions',
      'Business Automation',
      'Startup MVPs'
    ]
  };

  let categoryIndex = 0;
  let categoryTimer = null;

  /**
   * Hero animated category cycler
   */
  function initHeroCategoryCycler() {
    const el = document.getElementById('hero-rotating-text');
    if (!el) return;

    if (categoryTimer) clearInterval(categoryTimer);

    function getCategories() {
      const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
      return HERO_CATEGORIES[lang] || HERO_CATEGORIES.uz;
    }

    function updateText() {
      const categories = getCategories();
      categoryIndex = (categoryIndex + 1) % categories.length;

      el.classList.add('text-fade-out');

      setTimeout(() => {
        el.textContent = categories[categoryIndex];
        el.classList.remove('text-fade-out');
        el.classList.add('text-fade-in');
        setTimeout(() => {
          el.classList.remove('text-fade-in');
        }, 300);
      }, 250);
    }

    // Set initial text
    const initialCategories = getCategories();
    el.textContent = initialCategories[categoryIndex % initialCategories.length];

    // Cycle every 2800ms
    categoryTimer = setInterval(updateText, 2800);
  }

  /**
   * Scroll reveals via IntersectionObserver
   */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Stat counter animation on intersection
   */
  function initStatCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) return;

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetVal = el.getAttribute('data-target');
            if (targetVal) {
              animateCounter(el, targetVal);
            }
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  function animateCounter(el, targetStr) {
    const isNum = !isNaN(parseFloat(targetStr)) && isFinite(targetStr);
    if (!isNum) {
      el.textContent = targetStr;
      return;
    }

    const target = parseFloat(targetStr);
    const duration = 1200;
    const start = 0;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      el.textContent = current + (targetStr.includes('+') ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = targetStr;
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    initHeroCategoryCycler();
    initScrollReveals();
    initStatCounters();

    // Reset rotating text on language switch
    window.addEventListener('languageChanged', () => {
      const el = document.getElementById('hero-rotating-text');
      if (el) {
        const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
        const categories = HERO_CATEGORIES[lang] || HERO_CATEGORIES.uz;
        el.textContent = categories[categoryIndex % categories.length];
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
