/**
 * Netlify Serverless Function: send-telegram
 * Securely forwards incoming lead requests to Telegram Bot API.
 * Uses environment variables TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
 */

const https = require('https');

function sanitize(input, maxLength = 300) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // strip dangerous tags
    .trim()
    .slice(0, maxLength);
}

function sendTelegramRequest(token, chatId, text) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 8000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, body });
        } else {
          reject(new Error(`Telegram API responded with HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Telegram API request timed out'));
    });

    req.write(postData);
    req.end();
  });
}

exports.handler = async function (event, context) {
  // 1. Method validation
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  // 2. Parse & Content-Type validation
  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  // 3. Honeypot check (anti-spam)
  if (data._gotcha) {
    // Silently succeed to trick bots
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, note: 'ok' })
    };
  }

  // 4. Sanitize inputs
  const name = sanitize(data.name, 80);
  const phone = sanitize(data.phone, 30);
  const telegram = sanitize(data.telegram, 40);
  const email = sanitize(data.email, 80);
  const company = sanitize(data.company, 80);
  const service = sanitize(data.service, 80);
  const budget = sanitize(data.budget, 80);
  const message = sanitize(data.message, 1200);
  const visitorLanguage = sanitize(data.language, 50) || 'O‘zbekcha';

  // 5. Validation
  if (!name) {
    return {
      statusCode: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Name is required' })
    };
  }

  if (!phone && !telegram) {
    return {
      statusCode: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Phone or Telegram username is required' })
    };
  }

  if (!message) {
    return {
      statusCode: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Message is required' })
    };
  }

  // 6. Format Telegram Message in Uzbek with visitor's language flagged
  const nowStr = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

  const text = 
`🚀 <b>YANGI PORTFOLIO ARIZA</b>
🌐 <b>Sayt tili:</b> ${visitorLanguage}
👤 <b>Ism:</b> ${name}
📞 <b>Telefon:</b> ${phone || '-'}
✈️ <b>Telegram:</b> ${telegram || '-'}
📧 <b>Email:</b> ${email || '-'}
🏢 <b>Kompaniya:</b> ${company || '-'}
🛠 <b>Xizmat:</b> ${service || 'Umumiy'}
💰 <b>Budjet:</b> ${budget || 'Ko‘rsatilmagan'}

📝 <b>Loyiha haqida:</b>
${message}

🌐 <b>Manba:</b> Tohirjon Portfolio
🕒 <b>Sana:</b> ${nowStr}`;

  // Load .env in local dev if present
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envPath)) {
      const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
      for (const line of envLines) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          const value = (match[2] || '').trim();
          if (!process.env[key] && value) {
            process.env[key] = value;
          }
        }
      }
    }
  } catch (e) {
    // Ignore in production
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8812743783:AAGIFTe4W0h0vEBwuEWkQCg0iDlqbO2i5to';
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // 7. Simulation Fallback for local testing / unconfigured environment
  if (!botToken || !chatId) {
    console.log('--- [SIMULATED TELEGRAM LEAD (Set TELEGRAM_CHAT_ID to receive actual messages)] ---');
    console.log(text);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        simulation: true,
        message: 'Lead received. Set TELEGRAM_CHAT_ID to forward messages directly to your Telegram chat.'
      })
    };
  }

  // 8. Dispatch to Telegram
  try {
    await sendTelegramRequest(botToken, chatId, text);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error dispatching to Telegram:', error.message);
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to send notification to Telegram' })
    };
  }
};
