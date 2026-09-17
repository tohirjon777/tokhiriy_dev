/**
 * Helper script to automatically connect @zyavkailovabot to Tohirjon's Telegram account.
 * Run with: npm run connect-bot
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8812743783:AAGIFTe4W0h0vEBwuEWkQCg0iDlqbO2i5to';

function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function main() {
  console.log('🤖 Telegram Bot ulanishi tekshirilmoqda...');
  console.log(`Bot: @zyavkailovabot`);
  console.log(`Token: ${BOT_TOKEN.substring(0, 10)}...`);

  const me = await fetchJSON(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
  if (!me.ok) {
    console.error('❌ Bot token noto‘g‘ri:', me.description);
    process.exit(1);
  }
  console.log(`✓ Bot topildi: @${me.result.username} (${me.result.first_name})`);

  const updates = await fetchJSON(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
  if (!updates.ok) {
    console.error('❌ Xatolik yuz berdi:', updates.description);
    process.exit(1);
  }

  const messages = (updates.result || [])
    .filter(u => u.message || u.my_chat_member)
    .map(u => u.message || u.my_chat_member);

  if (messages.length === 0) {
    console.log('\n------------------------------------------------------------');
    console.log('⚠️ DIQQAT: Botga hali hech kim xabar yozmagan!');
    console.log('Telegram botlar foydalanuvchiga birinchi bo‘lib yozolmaydi.');
    console.log('\nQuyidagi oddiy qadamni bajaring:');
    console.log('1. Telegram ilovangizda @zyavkailovabot ni oching');
    console.log('2. "Start" (Boshlash) tugmasini bosing yoki biron xabar yozing (masalan: Salom)');
    console.log('3. So‘ngra terminalda yana buyruqni bering:');
    console.log('   node scripts/connect-bot.js');
    console.log('------------------------------------------------------------\n');
    return;
  }

  // Get the latest sender's chat ID
  const latestMsg = messages[messages.length - 1];
  const chat = latestMsg.chat;
  const chatId = chat.id;
  const userName = chat.first_name || chat.username || 'Admin';

  console.log(`\n✓ Foydalanuvchi aniqlandi: ${userName} (Chat ID: ${chatId})`);

  // Update .env file
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const newEnvContent = `TELEGRAM_BOT_TOKEN=${BOT_TOKEN}\nTELEGRAM_CHAT_ID=${chatId}\n`;
  fs.writeFileSync(envPath, newEnvContent, 'utf8');
  console.log('✓ .env fayliga TELEGRAM_CHAT_ID muvaffaqiyatli saqlandi!');

  // Send a test confirmation message to the user on Telegram
  const testMsg = 
`🎉 <b>Assalomu alaykum, Tohirjon!</b>

@zyavkailovabot portfoliongizga muvaffaqiyatli ulandi!

Endi veb-saytingizdagi forma orqali mijozlar yuborgan har bir ariza to‘g‘ridan-to‘g‘ri shu yerga quyidagi formatda keladi:
• Sayt tili
• Mijoz ismi
• Telefon raqami
• Telegram username
• Xizmat turi
• Budjet
• Loyiha tavsifi
• Yuborilgan vaqt

Tizim to‘liq tayyor! 🚀`;

  const sendRes = await fetchJSON(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: testMsg,
      parse_mode: 'HTML'
    })
  });

  if (sendRes.ok) {
    console.log(`✓ Telegramingizga (@${chat.username || userName}) tasdiqlovchi xabar yuborildi!`);
  } else {
    console.log('Xabar yuborishda xatolik:', sendRes.description);
  }
}

main().catch(console.error);
