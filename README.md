# Tohirjon Obidov — Multilingual Portfolio & Digital Solutions Website

A complete, production-ready, conversion-focused personal portfolio and digital services website for **Tohirjon Obidov** (Developer • Digital Solutions Specialist • Automation Specialist).

Built for high performance, zero framework bloat, instant multi-device responsiveness, and turnkey deployment on **Netlify** and **GitHub**.

---

## 🚀 Key Features

- **Multilingual System**: 100% full translation in **Uzbek (`uz`)** (default), **Russian (`ru`)**, and **English (`en`)**.
- **Instant Language Switching**: Switches live in-place without page reload, with smooth opacity transition.
- **Language Persistence & URL Routing**:
  - Saved to `localStorage.getItem('preferredLanguage')`.
  - Supports URL query parameters (e.g. `https://tohirjon.dev/?lang=ru` opens directly in Russian, ideal for sharing with international clients).
  - Priority: `URL query param` > `localStorage` > `Uzbek default`.
- **Dynamic SEO & Metadata**: Dynamically updates `<html lang="...">`, `<title>`, `<meta name="description">`, and Open Graph tags whenever language changes.
- **Featured Products**:
  - **AutoMaster**: Automotive service platform & Flutter mobile application connecting car owners with workshop mechanics.
  - **BIZOS**: Business process systematization and workflow automation engine integrating CRM, Telegram bots, and AI.
- **Business Automation Superpower**: Deep-dive architecture section highlighting CRM, lead capture, automated workflows, and executive dashboards.
- **Project Request Form & Telegram Alerts**:
  - Netlify Serverless Function (`/netlify/functions/send-telegram.js`).
  - Honeypot anti-spam protection, rate-limiting cooldown, and input sanitization.
  - Formats structured notifications directly to your Telegram bot with visitor language flagged.
  - Graceful dev fallback if environment variables are not yet configured.
- **Design & Performance**:
  - High-end dark tech palette (`#06142E`, `#0A2A66`, `#0066FF`, `#168BFF`, `#FFFFFF`).
  - Fluid typography and layout designed to prevent overflow even with longer Russian text.
  - Fully responsive across 320px, 375px, 390px, 430px, tablet, laptop, and 2K screens.

---

## 📁 Project Structure

```
/
├── index.html                  # Semantic, accessible HTML5 structure with data-i18n attributes
├── favicon.svg                 # Vector brand favicon monogram
├── robots.txt                  # Search engine crawling rules
├── sitemap.xml                 # Multilingual XML sitemap with hreflang tags
├── netlify.toml                # Netlify build, functions, and security header rules
├── package.json                # Project scripts and configuration
├── README.md                   # Comprehensive documentation
├── css/
│   ├── style.css               # Core styling, design tokens, cards, modal, typography
│   ├── responsive.css          # Mobile-first responsiveness & Russian text expansion rules
│   └── animations.css          # Subtle motion, category cycler, glow pulses, scroll reveals
├── js/
│   ├── translations-data.js    # Pre-bundled dictionaries for zero-delay offline execution
│   ├── i18n.js                 # Translation engine, persistence, and dynamic metadata updater
│   ├── portfolio.js            # Projects data (AutoMaster, BIZOS, etc.), filters, and modal logic
│   ├── animations.js           # Scroll observer, hero category cycler, stat counters
│   ├── contact.js              # Request form validation, honeypot, cooldown, Netlify call
│   └── main.js                 # Sticky header, mobile drawer, scrollspy, quick contact widget
├── locales/
│   ├── uz.json                 # Complete Uzbek locale file
│   ├── ru.json                 # Complete Russian locale file
│   └── en.json                 # Complete English locale file
├── assets/
│   └── projects/               # High-fidelity SVG vector previews for showcase projects
│       ├── automaster-preview.svg
│       ├── bizos-preview.svg
│       ├── ai-bot-preview.svg
│       ├── ecommerce-preview.svg
│       ├── saas-preview.svg
│       └── medical-preview.svg
└── netlify/
    └── functions/
        └── send-telegram.js    # Serverless backend for Telegram lead notifications
```

---

## 🌐 Multilingual Management Guide

### 1. How the Translation Engine Works
The translation engine (`/js/i18n.js`) searches the DOM for data attributes:
- `data-i18n="section.key"`: Sets `textContent` (or `innerHTML` if `data-i18n-html="true"`).
- `data-i18n-placeholder="form.key"`: Sets `placeholder` attribute on inputs.
- `data-i18n-aria="nav.key"`: Sets `aria-label` for screen readers and accessibility.
- `data-i18n-title="contact.key"`: Sets tooltip `title` attribute.

### 2. Editing Existing Translations
Translations are stored in modular JSON files in the `/locales/` directory:
- `/locales/uz.json` (Uzbek — default)
- `/locales/ru.json` (Russian)
- `/locales/en.json` (English)

To edit any string, locate the corresponding key in each of the three JSON files and update the text:
```json
{
  "hero": {
    "title": "Raqamli g‘oyalarni real mahsulotga aylantiraman."
  }
}
```

> **Note on Zero-Delay Offline Bundling**:
> For instant zero-latency loading and offline compatibility (avoiding local browser `file://` CORS restrictions), `/js/translations-data.js` mirrors the same translation dictionary. When updating translations in `/locales/*.json`, also copy the updated values to `/js/translations-data.js` so both static file preview and live web servers stay synchronized.

### 3. Adding a 4th Language in the Future (e.g. German `de` or Turkish `tr`)
1. Create `/locales/tr.json` using `/locales/en.json` as a template.
2. In `/js/translations-data.js`, add `tr: { ... }` with the translated dictionary.
3. In `/js/i18n.js`, add `'tr'` to the supported languages array:
   ```javascript
   const SUPPORTED_LANGS = ['uz', 'ru', 'en', 'tr'];
   ```
4. In `index.html`, add a button to the language switchers:
   ```html
   <button type="button" class="lang-btn" data-lang="tr">TR</button>
   ```
5. In `/js/portfolio.js`, add `tr` translations to each project object:
   ```javascript
   subtitle: {
     uz: "...",
     ru: "...",
     en: "...",
     tr: "..."
   }
   ```

---

## ⚙️ Netlify & Telegram Setup

### 1. Deploying to Netlify
1. Push this repository to **GitHub**.
2. Log into your **Netlify** account and click **"Add new site"** → **"Import an existing project"**.
3. Select your GitHub repository.
4. Netlify will automatically detect `netlify.toml` with:
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`
5. Click **"Deploy site"**.

### 2. Setting Telegram Lead Notification (@zyavkailovabot)
Your personal bot **@zyavkailovabot** (`8812743783:AAGIFTe4W0h0vEBwuEWkQCg0iDlqbO2i5to`) is already connected as the default bot in `/netlify/functions/send-telegram.js`.

To link your personal Telegram account:
1. Open Telegram and search **[@zyavkailovabot](https://t.me/zyavkailovabot)**.
2. Click **Start** (`/start`) or send any message.
3. In terminal, run:
   ```bash
   npm run connect-bot
   ```
   This script will automatically detect your `Chat ID`, save it to `.env`, and send a test confirmation message directly to your Telegram!

4. In your **Netlify** project settings (**Site Configuration** → **Environment variables**), add:
   - `TELEGRAM_BOT_TOKEN`: `8812743783:AAGIFTe4W0h0vEBwuEWkQCg0iDlqbO2i5to`
   - `TELEGRAM_CHAT_ID`: Your personal Chat ID (detected in step 3).

---

## 🔒 Form Security & Spam Protection

The lead generation system includes enterprise-grade safeguards:
1. **Hidden Honeypot Field**: An invisible `_gotcha` field traps automated bots without affecting human visitors.
2. **Rate Limiting & Cooldown**: Protects against accidental double-clicks and repeated submissions within 30 seconds.
3. **Serverless Isolation**: Never exposes your Telegram API token in client-side code; all transmission happens securely via Netlify's encrypted serverless environment.
4. **Input Sanitization**: Strips HTML tags and enforces character length boundaries on every submitted field.

---

## 📞 Contact Information

- **Name**: Tohirjon Obidov
- **Role**: Developer • Digital Solutions Specialist • Automation Specialist
- **Email**: [obidovtohirjon421@gmail.com](mailto:obidovtohirjon421@gmail.com)
- **Phone / WhatsApp**: [+998 90 136 13 82](tel:+998901361382)
- **Telegram**: [@obidov_tokhirjon](https://t.me/obidov_tokhirjon)
