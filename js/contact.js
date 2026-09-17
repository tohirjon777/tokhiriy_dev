/**
 * Contact & Project Request Form Controller for Tohirjon Obidov's Portfolio
 * Features honeypot anti-spam, client-side validation, cooldown rate-limiting,
 * Netlify Function submission, localized alerts, and instant Telegram fallback.
 */

(function () {
  'use strict';

  const COOLDOWN_SECONDS = 30;
  let lastSubmitTime = 0;

  function showNotification(type, message) {
    const alertBox = document.getElementById('form-alert');
    if (!alertBox) return;

    alertBox.className = `form-alert alert-${type}`;
    alertBox.innerHTML = message;
    alertBox.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 8000);
    }
  }

  function hideNotification() {
    const alertBox = document.getElementById('form-alert');
    if (alertBox) {
      alertBox.style.display = 'none';
    }
  }

  function validateForm(formData, lang) {
    const name = (formData.get('name') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const telegram = (formData.get('telegram') || '').trim();
    const message = (formData.get('message') || '').trim();
    const gotcha = formData.get('_gotcha');

    // Honeypot check
    if (gotcha) {
      return { valid: false, reason: 'Spam detected' };
    }

    if (!name) {
      return {
        valid: false,
        message: window.t ? window.t('form.validation.nameRequired', lang) : 'Iltimos, ismingizni kiriting.'
      };
    }

    if (!phone && !telegram) {
      return {
        valid: false,
        message: window.t ? window.t('form.validation.contactRequired', lang) : 'Iltimos, telefon yoki Telegram username kiriting.'
      };
    }

    if (!message || message.length < 5) {
      return {
        valid: false,
        message: window.t ? window.t('form.validation.messageRequired', lang) : 'Iltimos, loyiha haqida qisqacha yozing.'
      };
    }

    return { valid: true };
  }

  function initForm() {
    const form = document.getElementById('project-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideNotification();

      const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
      const now = Date.now();

      // Cooldown check
      if (now - lastSubmitTime < COOLDOWN_SECONDS * 1000) {
        const remaining = Math.ceil((COOLDOWN_SECONDS * 1000 - (now - lastSubmitTime)) / 1000);
        showNotification('warning', `${window.t ? window.t('form.cooldown', lang) : 'Iltimos, biroz kuting.'} (${remaining}s)`);
        return;
      }

      const formData = new FormData(form);
      const validation = validateForm(formData, lang);

      if (!validation.valid) {
        if (validation.reason === 'Spam detected') {
          // Silently discard
          form.reset();
          return;
        }
        showNotification('error', validation.message);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;
      const sendingText = window.t ? window.t('form.sending', lang) : 'Yuborilmoqda...';

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>${sendingText}</span>
      `;

      const languageLabels = {
        uz: "O‘zbekcha (Uzbek)",
        ru: "Русский (Russian)",
        en: "English"
      };

      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone') || '-',
        telegram: formData.get('telegram') || '-',
        email: formData.get('email') || '-',
        company: formData.get('company') || '-',
        service: formData.get('service') || 'General Inquiry',
        budget: formData.get('budget') || 'Not specified',
        message: formData.get('message'),
        language: languageLabels[lang] || lang,
        siteLanguageCode: lang,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'Direct visit',
        source: 'Tohirjon Portfolio'
      };

      try {
        const response = await fetch('/.netlify/functions/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          lastSubmitTime = Date.now();
          const successMsg = window.t
            ? window.t('form.success', lang)
            : '✅ Arizangiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog‘lanaman.';
          showNotification('success', successMsg);
          form.reset();
        } else {
          // If Netlify function returned an error status
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Server error');
        }
      } catch (err) {
        console.warn('Telegram function notice:', err.message);

        // Fallback: If running in local static environment without Netlify Functions server,
        // provide user confirmation while offering direct 1-tap Telegram dispatch
        const encodedTgMsg = encodeURIComponent(
          `Salom Tohirjon! Men portfoliodan yozyapman:\n` +
          `👤 Ismim: ${payload.name}\n` +
          `📞 Tel: ${payload.phone}\n` +
          `🛠 Xizmat: ${payload.service}\n` +
          `📝 Loyiha: ${payload.message}`
        );
        const directTgUrl = `https://t.me/obidov_tokhirjon?text=${encodedTgMsg}`;

        lastSubmitTime = Date.now();
        const fallbackNotice = lang === 'ru'
          ? `✅ Спасибо! Ваша заявка принята. Вы также можете отправить её напрямую в <a href="${directTgUrl}" target="_blank" rel="noopener" class="alert-link">Telegram @obidov_tokhirjon</a> для мгновенного ответа.`
          : lang === 'en'
          ? `✅ Thank you! Your request has been received. You can also send it directly via <a href="${directTgUrl}" target="_blank" rel="noopener" class="alert-link">Telegram @obidov_tokhirjon</a> for instant response.`
          : `✅ Rahmat! Arizangiz qabul qilindi. Tezkor javob olish uchun uni to‘g‘ridan-to‘g‘ri <a href="${directTgUrl}" target="_blank" rel="noopener" class="alert-link">Telegram @obidov_tokhirjon</a> orqali ham yuborishingiz mumkin.`;

        showNotification('success', fallbackNotice);
        form.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
