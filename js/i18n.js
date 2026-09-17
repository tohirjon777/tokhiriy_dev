/**
 * i18n Translation Engine for Tohirjon Obidov's Portfolio
 * Supports UZ (default), RU, EN.
 * Language resolution: URL query param (?lang=) > localStorage > 'uz'
 */

(function () {
  'use strict';

  const SUPPORTED_LANGS = ['uz', 'ru', 'en'];
  const DEFAULT_LANG = 'uz';
  const STORAGE_KEY = 'preferredLanguage';

  let currentLang = DEFAULT_LANG;
  let translations = window.TRANSLATIONS_DATA || {};

  /**
   * Determine initial language based on priority:
   * 1. URL search param ?lang=
   * 2. localStorage
   * 3. Uzbek default ('uz')
   */
  function detectInitialLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LANGS.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }

      const storedLang = localStorage.getItem(STORAGE_KEY);
      if (storedLang && SUPPORTED_LANGS.includes(storedLang.toLowerCase())) {
        return storedLang.toLowerCase();
      }
    } catch (e) {
      console.warn('Could not read storage or URL params:', e);
    }
    return DEFAULT_LANG;
  }

  /**
   * Retrieve nested value using dot-notation, e.g. "hero.title"
   */
  function getNestedValue(obj, keyPath) {
    if (!obj || !keyPath) return null;
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
      if (current === undefined || current === null) return null;
      current = current[parts[i]];
    }
    return current;
  }

  /**
   * Translation helper
   */
  function t(key, lang = currentLang) {
    const langData = translations[lang] || translations[DEFAULT_LANG] || {};
    const val = getNestedValue(langData, key);
    if (val !== null && val !== undefined) {
      return val;
    }
    // Fallback to default language
    if (lang !== DEFAULT_LANG && translations[DEFAULT_LANG]) {
      const fallbackVal = getNestedValue(translations[DEFAULT_LANG], key);
      if (fallbackVal !== null && fallbackVal !== undefined) {
        return fallbackVal;
      }
    }
    return key;
  }

  /**
   * Update HTML head SEO tags
   */
  function updateMetadata(lang) {
    const langData = translations[lang] || translations[DEFAULT_LANG] || {};
    const seo = langData.seo || {};

    if (seo.title) {
      document.title = seo.title;
    }

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl && seo.description) {
      descEl.setAttribute('content', seo.description);
    }

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl && (seo.ogTitle || seo.title)) {
      ogTitleEl.setAttribute('content', seo.ogTitle || seo.title);
    }

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl && (seo.ogDescription || seo.description)) {
      ogDescEl.setAttribute('content', seo.ogDescription || seo.description);
    }

    const twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleEl && (seo.ogTitle || seo.title)) {
      twitterTitleEl.setAttribute('content', seo.ogTitle || seo.title);
    }

    const twitterDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescEl && (seo.ogDescription || seo.description)) {
      twitterDescEl.setAttribute('content', seo.ogDescription || seo.description);
    }
  }

  /**
   * Update all DOM elements with i18n data attributes
   */
  function translateDOM(lang) {
    // 1. Text elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, lang);
      if (val !== null && val !== undefined) {
        // If element has data-i18n-html="true", use innerHTML, else textContent
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. Placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key, lang);
      if (val) {
        el.setAttribute('placeholder', val);
      }
    });

    // 3. Aria-labels
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const val = t(key, lang);
      if (val) {
        el.setAttribute('aria-label', val);
      }
    });

    // 4. Titles
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key, lang);
      if (val) {
        el.setAttribute('title', val);
      }
    });

    // 5. Value attributes (e.g. submit buttons or option labels)
    const valueElements = document.querySelectorAll('[data-i18n-value]');
    valueElements.forEach((el) => {
      const key = el.getAttribute('data-i18n-value');
      const val = t(key, lang);
      if (val) {
        el.setAttribute('value', val);
      }
    });
  }

  /**
   * Update active classes on language switchers
   */
  function updateLanguageButtons(lang) {
    // Desktop switcher buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Mobile select dropdown if present
    const mobileSelect = document.querySelector('#mobile-lang-select');
    if (mobileSelect && mobileSelect.value !== lang) {
      mobileSelect.value = lang;
    }
  }

  /**
   * Main function to set language
   */
  function setLanguage(newLang, options = {}) {
    const lang = (newLang || '').toLowerCase();
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn(`Unsupported language: ${newLang}. Fallback to ${DEFAULT_LANG}`);
      return setLanguage(DEFAULT_LANG, options);
    }

    currentLang = lang;

    // 1. Update <html lang="...">
    document.documentElement.setAttribute('lang', lang);

    // 2. Persist in localStorage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Cannot write to localStorage:', e);
    }

    // 3. Optionally update URL query param without page reload
    if (options.updateUrl !== false) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // Ignore in environments where history API is restricted
      }
    }

    // 4. Subtle opacity switch animation (without replaying heavy entrance animations)
    document.body.classList.add('i18n-switching');

    // 5. Translate DOM and metadata
    translateDOM(lang);
    updateMetadata(lang);
    updateLanguageButtons(lang);

    setTimeout(() => {
      document.body.classList.remove('i18n-switching');
    }, 150);

    // 6. Broadcast event for other modules
    window.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: { lang, t: (k) => t(k, lang) },
      })
    );
  }

  /**
   * Attach switcher click listeners
   */
  function bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (btn) {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang && selectedLang !== currentLang) {
          setLanguage(selectedLang);
        }
      }
    });

    const mobileSelect = document.querySelector('#mobile-lang-select');
    if (mobileSelect) {
      mobileSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        if (selectedLang && selectedLang !== currentLang) {
          setLanguage(selectedLang);
        }
      });
    }
  }

  /**
   * Initialization
   */
  function init() {
    const initialLang = detectInitialLanguage();
    bindEvents();
    setLanguage(initialLang, { updateUrl: false });
  }

  // Expose global API
  window.i18n = {
    setLanguage,
    getCurrentLanguage: () => currentLang,
    t,
    getSupportedLanguages: () => [...SUPPORTED_LANGS],
    getDefaultLanguage: () => DEFAULT_LANG,
  };
  window.setLanguage = setLanguage;
  window.t = t;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
