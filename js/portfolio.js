/**
 * Portfolio Data & Modal Engine for Tohirjon Obidov's Portfolio
 * High-fidelity real projects: AutoMaster, BIZOS, AI Automation, and more.
 */

(function () {
  'use strict';

  const PROJECTS = [
    {
      id: 'automaster',
      featured: true,
      category: ['startup', 'mobile', 'web'],
      image: 'assets/projects/automaster-preview.svg',
      badge: {
        uz: 'Featured Product / Startup',
        ru: 'Флагманский продукт / Startup',
        en: 'Featured Product / Startup',
      },
      title: 'AutoMaster',
      subtitle: {
        uz: 'Avtoservis va avtomobil ustalari raqamli platformasi',
        ru: 'Цифровая сервисная платформа для автосервисов и автовладельцев',
        en: 'Digital service platform connecting vehicle owners & auto workshops',
      },
      shortDesc: {
        uz: 'AutoMaster — avtomobil egalari va xizmat ko‘rsatuvchi ustalarni raqamli tizim orqali bog‘lashga mo‘ljallangan servis platformasi.',
        ru: 'AutoMaster — цифровая сервисная платформа, предназначенная для взаимодействия владельцев автомобилей и специалистов автосервиса.',
        en: 'AutoMaster is a digital service platform designed to connect vehicle owners with automotive service professionals.',
      },
      fullDesc: {
        uz: 'AutoMaster platformasi avtomobil egalariga yaqin atrofdagi eng mos avtoservislar va ustalarni reytingi bo‘yicha topish, xizmat narxlarini bilish va onlayn navbatga yozilish imkonini beradi. Servis ustalari va avtomarkazlar uchun esa buyurtmalar oqimini tartibga solish, xodimlarning ish faoliyatini rejalashtirish, xarita integratsiyasi, Telegram orqali bildirishnomalar va boshqaruv panelini o‘z ichiga oladi.',
        ru: 'Платформа AutoMaster позволяет автовладельцам быстро находить подходящие автосервисы и специалистов по рейтингу, узнавать стоимость услуг и записываться онлайн. Для автоцентров и мастеров реализован функционал управления очередью и заказами, расписание персонала, уведомления в Telegram, карты и многоуровневая панель управления.',
        en: 'AutoMaster enables car owners to locate certified auto repair workshops, compare transparent pricing and customer ratings, and schedule service bookings online. For workshops and mechanics, it delivers an operational order queue, technician dispatching, real-time Telegram and push notifications, interactive maps, and an administrative management dashboard.',
      },
      features: {
        uz: [
          'Cross-platform Mobil ilova (Flutter iOS & Android)',
          'Avtoservis va ustaxonalar qidiruvi hamda filtrlash',
          'Onlayn bron qilish va navbat boshqaruvi',
          'Mijoz va Usta alohida shaxsiy kabinetlari',
          'Buyurtma holatini real vaqtda kuzatish',
          'Push bildirishnomalar va Telegram orqali xabarnomalar',
          'Geolokatsiya va xarita integratsiyasi',
          'Admin boshqaruv paneli va biznes jarayonlari avtomatizatsiyasi'
        ],
        ru: [
          'Кроссплатформенное мобильное приложение (Flutter iOS & Android)',
          'Поиск и умная фильтрация автосервисов и мастеров',
          'Система онлайн-бронирования и электронной очереди',
          'Раздельные личные кабинеты для клиентов и мастеров',
          'Отслеживание статуса заказа в реальном времени',
          'Push-уведомления и оповещения в Telegram',
          'Интеграция с картами и геолокацией',
          'Панель администратора и автоматизация бизнес-процессов'
        ],
        en: [
          'Cross-platform Mobile Application (Flutter iOS & Android)',
          'Automotive workshop discovery & smart filtering',
          'Online booking system and queue management',
          'Dedicated Customer and Service Provider portals',
          'Real-time service order progress tracking',
          'Push notifications & instant Telegram alerts',
          'Interactive map and geolocation routing',
          'Comprehensive Admin control panel & workflow automation'
        ]
      },
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Laravel', 'MySQL', 'Push Notifications', 'Maps', 'Telegram API'],
      serviceType: 'complex'
    },
    {
      id: 'bizos',
      featured: true,
      category: ['automation', 'web', 'bot'],
      image: 'assets/projects/bizos-preview.svg',
      badge: {
        uz: 'Business Automation',
        ru: 'Автоматизация бизнеса',
        en: 'Business Automation',
      },
      title: 'BIZOS',
      subtitle: {
        uz: 'Biznes jarayonlarini tizimlashtirish va avtomatlashtirish',
        ru: 'Систематизация и автоматизация бизнес-процессов',
        en: 'Business process systematization and automation platform',
      },
      shortDesc: {
        uz: 'BIZOS — biznes jarayonlarini tizimlashtirish va avtomatlashtirish yo‘nalishida ishlaydigan loyiha. Kompaniyalarning kundalik jarayonlarini raqamli tizimlar, CRM va integratsiyalar orqali samaraliroq qilish.',
        ru: 'BIZOS — проект в области систематизации и автоматизации бизнес-процессов. Цифровизация внутренних процессов компаний с использованием CRM, интеграций, автоматизации и современных технологий.',
        en: 'BIZOS focuses on business process systematization and automation. Improving company workflows through digital systems, CRM solutions, integrations, automation, and modern technologies.',
      },
      fullDesc: {
        uz: 'BIZOS tizimi orqali turli sohadagi korxonalar (savdo, ishlab chiqarish, xizmat ko‘rsatish) qo‘lda bajariladigan takroriy ishlarni to‘liq avtomatlashtiradi. Instagram, Telegram va veb-saytdan tushgan barcha lidlar yagona CRMga tushadi, xodimlarga vazifalar taqsimlanadi, eslatmalar yuboriladi va moliyaviy hisobotlar avtomatik shakllanadi.',
        ru: 'С помощью системы BIZOS компании в сфере торговли, услуг и дистрибуции полностью избавляются от рутинных ручных действий. Заявки из Telegram, Instagram и веб-сайтов автоматически стекаются в CRM, задачи распределяются менеджерам, а аналитические и финансовые отчеты формируются без задержек.',
        en: 'With BIZOS, commercial enterprises and service businesses automate repetitive operational workflows. Inquiries from social channels, Telegram, and websites flow directly into a centralized CRM pipeline, tasks are automatically routed to responsible staff, and financial and performance reports generate in real time.',
      },
      features: {
        uz: [
          'Biznes jarayonlarini chuqur tahlil qilish va modellashtirish',
          'CRM va ko‘p bosqichli sotuv voronkasi integratsiyasi',
          'Avtomatlashtirilgan vazifalar va triggerlar (Workflows)',
          'Telegram orqali buyurtma va eslatmalar botlari',
          'AI asosidagi mijozlar so‘rovlarini saralash',
          'Moliya, buyurtmalar va xodimlar KPI analitikasi',
          'To‘lov tizimlari va 1C bilan API integratsiyalari'
        ],
        ru: [
          'Глубокий аудит и моделирование бизнес-процессов',
          'Интеграция CRM и многоуровневой воронки продаж',
          'Автоматические сценарии и триггеры задач (Workflows)',
          'Telegram-боты для контроля заказов и уведомлений',
          'AI-квалификация входящих клиентских лидов',
          'Аналитика финансов, конверсий и KPI сотрудников',
          'Интеграция по API с платежными шлюзами и 1C'
        ],
        en: [
          'Comprehensive business workflow audit and modeling',
          'CRM & multi-stage sales funnel implementation',
          'Automated trigger workflows and event handlers',
          'Telegram notification bots & dispatch assistants',
          'AI-powered lead qualification & intent recognition',
          'Real-time financial, conversion & staff KPI dashboards',
          'Secure API connections with payment gateways & ERPs'
        ]
      },
      technologies: ['Node.js', 'Laravel', 'MySQL', 'Telegram API', 'OpenAI API', 'REST API', 'CRM Webhooks', 'Docker'],
      serviceType: 'automation'
    },
    {
      id: 'ai-sales-bot',
      featured: false,
      category: ['bot', 'ai', 'automation'],
      image: 'assets/projects/ai-bot-preview.svg',
      badge: {
        uz: 'Telegram Mini App + AI',
        ru: 'Telegram Mini App + AI',
        en: 'Telegram Mini App + AI',
      },
      title: 'SmartDesk AI & Telegram Mini App',
      subtitle: {
        uz: 'Sun’iy intellekt asosidagi mijozlarga xizmat va savdo boti',
        ru: 'Интеллектуальный бот поддержки и продаж на базе AI',
        en: 'AI-driven 24/7 customer support & sales Mini App',
      },
      shortDesc: {
        uz: 'Kompaniya mahsulotlari bo‘yicha mijozlarga 24/7 aqlli maslahat beruvchi, buyurtma oluvchi va CRMga ulaydigan Telegram Mini App tizimi.',
        ru: 'Telegram Mini App для круглосуточных консультаций, приема заказов и квалификации лидов с бесшовной интеграцией в CRM.',
        en: 'Telegram Mini App solution providing 24/7 AI-driven customer consultations, product catalog discovery, and instant CRM sync.',
      },
      fullDesc: {
        uz: 'OpenAI GPT modellari bilan o‘rgatilgan mazkur bot kompaniya ma’lumotlar bazasi asosida mijozlarning savollariga insondek tabiiy javob beradi. Foydalanuvchi Telegram ichidan chiqmagan holda mahsulotlarni ko‘rishi, savatga qo‘shishi va to‘lovni Click yoki Payme orqali amalga oshirishi mumkin.',
        ru: 'Бот обучен на базе знаний компании с использованием моделей OpenAI. Он естественно отвечает на вопросы клиентов, демонстрирует каталог товаров внутри Telegram Mini App и дает возможность мгновенно оплатить заказ через Click/Payme.',
        en: 'Trained on company product documentation via OpenAI API, this agent handles inquiries with contextual accuracy. Visitors browse interactive catalogs inside Telegram Mini App, submit cart orders, and complete checkouts via local payment gateways.',
      },
      features: {
        uz: [
          'Telegram Mini App zamonaviy interfeysi',
          'OpenAI API (ChatGPT) integratsiyasi',
          'Click va Payme orqali onlayn to‘lov',
          'Avtomatik mijozlar bazasini to‘ldirish',
          'Operatorga ulanish va qo‘lda boshqarish rejimi'
        ],
        ru: [
          'Современный интерфейс Telegram Mini App',
          'Интеграция OpenAI API (ChatGPT)',
          'Прием платежей через Click и Payme',
          'Автоматическая запись лидов в CRM',
          'Бесшовное переключение на живого оператора'
        ],
        en: [
          'Interactive Telegram Mini App frontend',
          'OpenAI API fine-tuned prompt pipeline',
          'Click and Payme digital checkout integration',
          'Automatic lead capture & CRM ingestion',
          'Seamless fallback to human operator desk'
        ]
      },
      technologies: ['JavaScript', 'Node.js', 'Telegram Mini Apps', 'OpenAI API', 'REST API', 'Click API', 'Payme API'],
      serviceType: 'bot'
    },
    {
      id: 'ecommerce-ecosystem',
      featured: false,
      category: ['web', 'bot', 'automation'],
      image: 'assets/projects/ecommerce-preview.svg',
      badge: {
        uz: 'Web & Telegram Ekotizim',
        ru: 'Веб и Telegram Экосистема',
        en: 'Web & Telegram Ecosystem',
      },
      title: 'NexStore Omnichannel E-commerce',
      subtitle: {
        uz: 'Onlayn do‘kon va Telegram savdo tizimi sinxronizatsiyasi',
        ru: 'Синхронизированный онлайн-магазин и бот для продаж',
        en: 'Synchronized Web store & Telegram order processing engine',
      },
      shortDesc: {
        uz: 'Veb-sayt, Telegram bot va ombor hisobi yagona ma’lumotlar bazasida ishlaydigan to‘liq savdo ekotizimi.',
        ru: 'Единая экосистема электронной торговли: веб-магазин, Telegram-бот и автоматический складской учет с общей базой.',
        en: 'Complete omnichannel retail platform syncing web store catalog, Telegram order bot, and warehouse inventory in real time.',
      },
      fullDesc: {
        uz: 'Savdo bizneslari uchun mo‘ljallangan ushbu loyiha mahsulot qoldiqlarini veb-sayt va Telegram bot o‘rtasida sinxron saqlaydi. Buyurtma kelib tushganda kuryerga yetkazib berish xabari, mijozga trek-kod, boshqaruvchiga esa moliya hisoboti avtomatik tarzda yetib boradi.',
        ru: 'Проект разработан для ритейлеров и дистрибьюторов. Остатки товаров мгновенно обновляются на сайте и в боте. При заказе курьер получает детали доставки, клиент — трек-номер, а бухгалтер — фискальные данные.',
        en: 'Tailored for retail operations, this solution synchronizes SKU inventory between the web storefront and Telegram bot. When orders are placed, drivers receive delivery manifests, buyers get tracking updates, and managers view real-time sales tallies.',
      },
      features: {
        uz: [
          'Tez yuklanuvchi zamonaviy veb-do‘kon',
          'Sinxron ishlovchi Telegram savdo boti',
          'Ombor va mahsulot qoldiqlari hisobi',
          'Avtomatik SMS va Telegram xabarnomalar',
          'Kuryerlar uchun qulay buyurtma qabul qilish tizimi'
        ],
        ru: [
          'Быстрый адаптивный интернет-магазин',
          'Синхронизированный бот продаж в Telegram',
          'Учет складских остатков в реальном времени',
          'Автоматические SMS и Telegram уведомления',
          'Модуль распределения заказов для курьеров'
        ],
        en: [
          'Fast modern e-commerce storefront',
          'Real-time synchronized Telegram commerce bot',
          'Live warehouse inventory tracking',
          'Automated SMS & Telegram dispatch alerts',
          'Dedicated courier dispatch module'
        ]
      },
      technologies: ['Laravel', 'MySQL', 'JavaScript ES6+', 'REST API', 'Telegram Bot API', 'Tailwind CSS'],
      serviceType: 'web'
    },
    {
      id: 'saas-analytics',
      featured: false,
      category: ['web', 'automation'],
      image: 'assets/projects/saas-preview.svg',
      badge: {
        uz: 'SaaS Platforma',
        ru: 'SaaS Платформа',
        en: 'SaaS Platform',
      },
      title: 'DataPulse Business Intelligence',
      subtitle: {
        uz: 'Biznes ko‘rsatkichlari va tahliliy boshqaruv paneli',
        ru: 'Аналитическая панель бизнес-метрик и отчетности',
        en: 'Executive KPI monitoring & real-time analytics portal',
      },
      shortDesc: {
        uz: 'Kompaniya daromadlari, xarajatlari va operatsion samaradorligini vizual grafiklar orqali ko‘rsatuvchi interaktiv boshqaruv paneli.',
        ru: 'Интерактивная панель управления для визуализации доходов, расходов, конверсий и ключевых операционных показателей компании.',
        en: 'Interactive executive dashboard displaying company revenue, operational expenditures, conversion rates, and staff efficiency metrics.',
      },
      fullDesc: {
        uz: 'Rahbarlar uchun yaratilgan ushbu tizim turli manbalardan (banklar, CRM, sayt) ma’lumotlarni yig‘ib, ularni jonli grafiklar va jadval hisobotlari ko‘rinishida taqdim etadi. Excel fayllarini qo‘lda yuritishga chek qo‘yadi.',
        ru: 'Система для топ-менеджмента, аккумулирующая данные из CRM, банковских счетов и маркетинговых каналов. Заменяет ручные отчеты в Excel наглядными интерактивными графиками с экспортом в PDF.',
        en: 'Engineered for executive leadership, this portal aggregates metrics from CRM instances, bank statements, and sales pipelines, replacing manual spreadsheets with live responsive visual graphs and PDF exports.',
      },
      features: {
        uz: [
          'Jonli interaktiv grafiklar va moliyaviy hisobotlar',
          'Turli xodimlar uchun moslashuvchan kirish huquqlari (RBAC)',
          'Avtomatik haftalik va oylik PDF hisobotlar',
          'Bir nechta filiallar ma’lumotlarini taqqoslash',
          'Xavfsiz bulutli arxitektura'
        ],
        ru: [
          'Интерактивные графики и финансовая аналитика',
          'Ролевая модель доступа сотрудников (RBAC)',
          'Генерация еженедельных и месячных PDF-отчетов',
          'Сравнение показателей филиалов компании',
          'Защищенная облачная архитектура'
        ],
        en: [
          'Interactive live charts & financial reports',
          'Granular Role-Based Access Control (RBAC)',
          'Automated weekly & monthly PDF summaries',
          'Multi-branch performance benchmark engine',
          'Hardened, enterprise-grade cloud architecture'
        ]
      },
      technologies: ['Node.js', 'PostgreSQL', 'HTML5', 'CSS3', 'Chart.js', 'REST API', 'Netlify'],
      serviceType: 'web'
    },
    {
      id: 'medical-booking',
      featured: false,
      category: ['mobile', 'web', 'automation'],
      image: 'assets/projects/medical-preview.svg',
      badge: {
        uz: 'Tibbiyot / CRM',
        ru: 'Медицина / CRM',
        en: 'Healthcare / CRM',
      },
      title: 'MedLine Clinic & Patient Portal',
      subtitle: {
        uz: 'Klinikalar uchun bemorlar navbati va shifokorlar ish jadvali',
        ru: 'Электронная регистратура и расписание врачей для клиник',
        en: 'Healthcare queue management & physician appointment platform',
      },
      shortDesc: {
        uz: 'Tibbiyot markazlari va stomatologiyalar uchun bemorlarni onlayn qabulga yozish, elektron kartalar yuritish va eslatmalar tizimi.',
        ru: 'Цифровая система для клиник: онлайн-запись пациентов на прием, электронная медицинская карта и автоматические напоминания.',
        en: 'Comprehensive digital clinic platform featuring online patient appointments, digital medical histories, and automated reminder alerts.',
      },
      fullDesc: {
        uz: 'Klinika ma’murlari va shifokorlar ishini yengillashtiruvchi to‘liq dasturiy ta’minot. Bemorlar mobil yoki veb orqali shifokor qabuliga navbat oladi, qabul vaqtidan oldin SMS yoki Telegram eslatma oladi. Bu esa kutish zallaridagi tirbandlikni bartaraf etadi.',
        ru: 'Решение для медицинских центров и стоматологий. Пациенты выбирают удобное время врача на сайте или в приложении, получают напоминания за день и за 2 часа до визита, что исключает опоздания и пропуски.',
        en: 'A turnkey solution for outpatient clinics and dental centers. Patients book available slots on web or mobile, receiving timely Telegram or SMS reminders that eliminate no-shows and reception bottlenecks.',
      },
      features: {
        uz: [
          'Shifokorlar ish grafigi va qabul vaqtlari boshqaruvi',
          'Bemorlar uchun tezkor onlayn bron qilish interfeysi',
          'SMS va Telegram orqali avtomatik eslatmalar',
          'Elektron bemor tarixi va muolajalar kartasi',
          'Filiallar va shifokorlar unumdorligi hisoboti'
        ],
        ru: [
          'Управление графиками приемов и кабинетов',
          'Удобная онлайн-запись для пациентов',
          'Автоматические SMS и Telegram напоминания',
          'Электронная карта пациента и история посещений',
          'Финансовые и операционные отчеты клиники'
        ],
        en: [
          'Physician schedule and room availability planner',
          'Frictionless online booking interface for patients',
          'Automated SMS & Telegram visit reminders',
          'Digital patient health history & appointment logs',
          'Multi-doctor productivity and revenue reporting'
        ]
      },
      technologies: ['Flutter', 'Laravel', 'MySQL', 'SMS Gateway API', 'Telegram API', 'Firebase'],
      serviceType: 'mobile'
    }
  ];

  let currentFilter = 'all';

  /**
   * Render portfolio project cards
   */
  function renderProjects(lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz') {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const filtered = PROJECTS.filter((proj) => {
      if (currentFilter === 'all') return true;
      return proj.category.includes(currentFilter);
    });

    container.innerHTML = '';

    filtered.forEach((proj) => {
      const card = document.createElement('article');
      card.className = `portfolio-card ${proj.featured ? 'featured-card' : ''}`;
      card.setAttribute('data-id', proj.id);

      const badgeText = proj.badge[lang] || proj.badge.uz;
      const subtitleText = proj.subtitle[lang] || proj.subtitle.uz;
      const descText = proj.shortDesc[lang] || proj.shortDesc.uz;
      const viewBtnText = window.t ? window.t('portfolio.viewDetails', lang) : 'Batafsil';

      const techBadges = proj.technologies
        .slice(0, 4)
        .map((t) => `<span class="tech-pill">${t}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-visual">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" class="card-mockup" />
          <div class="card-overlay">
            <button type="button" class="btn btn-sm btn-light open-modal-btn" data-project-id="${proj.id}">
              <span>${viewBtnText}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </button>
          </div>
          <span class="card-category-tag">${badgeText}</span>
        </div>
        <div class="card-body">
          <div class="card-header-line">
            <h3 class="card-title">${proj.title}</h3>
          </div>
          <p class="card-subtitle">${subtitleText}</p>
          <p class="card-desc">${descText}</p>
          <div class="card-tags">
            ${techBadges}
            ${proj.technologies.length > 4 ? `<span class="tech-pill-more">+${proj.technologies.length - 4}</span>` : ''}
          </div>
          <div class="card-footer-action">
            <button type="button" class="action-link open-modal-btn" data-project-id="${proj.id}">
              <span>${viewBtnText}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  /**
   * Open project modal with details
   */
  function openModal(projectId) {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (!proj) return;

    const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalBadge = document.getElementById('modal-badge');
    const modalDesc = document.getElementById('modal-description');
    const modalFeaturesList = document.getElementById('modal-features-list');
    const modalTechList = document.getElementById('modal-tech-list');
    const modalImage = document.getElementById('modal-image');
    const modalDiscussBtn = document.getElementById('modal-discuss-btn');

    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalBadge) modalBadge.textContent = proj.badge[lang] || proj.badge.uz;
    if (modalDesc) modalDesc.textContent = proj.fullDesc[lang] || proj.fullDesc.uz;

    if (modalImage) {
      modalImage.src = proj.image;
      modalImage.alt = proj.title;
    }

    if (modalFeaturesList) {
      const features = proj.features[lang] || proj.features.uz || [];
      modalFeaturesList.innerHTML = features
        .map(
          (feat) =>
            `<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#168BFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${feat}</span></li>`
        )
        .join('');
    }

    if (modalTechList) {
      modalTechList.innerHTML = proj.technologies
        .map((t) => `<span class="modal-tech-pill">${t}</span>`)
        .join('');
    }

    if (modalDiscussBtn) {
      modalDiscussBtn.onclick = () => {
        closeModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          // Pre-select service in form
          const serviceSelect = document.getElementById('form-service');
          if (serviceSelect && proj.serviceType) {
            serviceSelect.value = proj.serviceType;
          }
          const messageTextarea = document.getElementById('form-message');
          if (messageTextarea && !messageTextarea.value) {
            const label = proj.title;
            messageTextarea.value = lang === 'ru' 
              ? `Здравствуйте! Хочу обсудить разработку проекта, аналогичного ${label}.`
              : lang === 'en'
              ? `Hello! I would like to discuss developing a project similar to ${label}.`
              : `Assalomu alaykum! Men ${label} loyihasiga o‘xshash loyiha ishlab chiqish bo‘yicha gaplashmoqchi edim.`;
          }
        }
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  /**
   * Close project modal
   */
  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Setup event listeners
   */
  function setupListeners() {
    // Filter click buttons
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects();
      });
    });

    // Delegated click for project cards
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.open-modal-btn');
      if (openBtn) {
        e.preventDefault();
        const pid = openBtn.getAttribute('data-project-id');
        if (pid) openModal(pid);
        return;
      }

      // Modal close button
      const closeBtn = e.target.closest('.modal-close');
      if (closeBtn) {
        e.preventDefault();
        closeModal();
        return;
      }

      // Modal backdrop click
      const modal = document.getElementById('project-modal');
      if (modal && e.target === modal) {
        closeModal();
      }
    });

    // Keyboard escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Re-render when language changes
    window.addEventListener('languageChanged', (e) => {
      renderProjects(e.detail.lang);
    });
  }

  function init() {
    setupListeners();
    renderProjects();
  }

  window.portfolio = {
    render: renderProjects,
    openModal,
    closeModal,
    getProjects: () => [...PROJECTS]
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
