import axios from 'axios'

// 🚀 МЕГА КОЛЛЕКЦИЯ БЕСПЛАТНЫХ AI API!
// Все OpenAI-совместимые, работают БЕЗ ключей!

const FREE_AI_APIS = [
  // 🔥 РАБОЧИЙ API ИЗ WEBSITE - ТОПОВЫЕ МОДЕЛИ!
  {
    name: 'ChatAnywhere GPT-4',
    endpoint: 'https://api.chatanywhere.tech/v1/chat/completions',
    model: 'gpt-4',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4',
    status: 'https://api.chatanywhere.tech/v1/models'
  },
  {
    name: 'ChatAnywhere GPT-4o',
    endpoint: 'https://api.chatanywhere.tech/v1/chat/completions',
    model: 'gpt-4o',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4',
    status: 'https://api.chatanywhere.tech/v1/models'
  },
  {
    name: 'ChatAnywhere GPT-4-turbo',
    endpoint: 'https://api.chatanywhere.tech/v1/chat/completions',
    model: 'gpt-4-turbo',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4',
    status: 'https://api.chatanywhere.tech/v1/models'
  },
  {
    name: 'ChatAnywhere',
    endpoint: 'https://api.chatanywhere.tech/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4',
    status: 'https://api.chatanywhere.tech/v1/models'
  },
  
  // Альтернативные ChatAnywhere
  {
    name: 'ChatAnywhere CN',
    endpoint: 'https://api.chatanywhere.cn/v1/chat/completions',
    model: 'gpt-4',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4'
  },
  {
    name: 'ChatAnywhere Org',
    endpoint: 'https://api.chatanywhere.org/v1/chat/completions',
    model: 'gpt-4-turbo',
    key: 'sk-W3WuTHKVmxudeH6AqojJSm8RH50D9DKRuO6FVnbJufOVDnw4'
  },
  
  // GPT4Free официальный
  {
    name: 'GPT4Free',
    endpoint: 'http://localhost:1337/v1/chat/completions',
    model: 'gpt-4',
    status: 'http://localhost:1337/v1/models',
    needsLocal: true
  },
  
  // Публичные API
  {
    name: 'DeepInfra',
    endpoint: 'https://api.deepinfra.com/v1/openai/chat/completions',
    model: 'meta-llama/Llama-2-70b-chat-hf',
    status: 'https://api.deepinfra.com/v1/openai/models'
  },
  {
    name: 'Blackbox AI',
    endpoint: 'https://www.blackbox.ai/api/chat',
    model: 'blackbox',
    format: 'blackbox'
  },
  {
    name: 'DuckDuckGo AI',
    endpoint: 'https://duckduckgo.com/duckchat/v1/chat',
    model: 'gpt-3.5-turbo',
    format: 'duckduckgo'
  },
  
  // Cool-ai-stuff API
  {
    name: 'NagaAI',
    endpoint: 'https://api.naga.ac/v1/chat/completions',
    model: 'gpt-4o-mini',
    status: 'https://api.naga.ac/v1/models'
  },
  {
    name: 'VoidAI',
    endpoint: 'https://api.voidai.app/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    status: 'https://api.voidai.app/v1/models'
  },
  {
    name: 'ZanityAI',
    endpoint: 'https://api.zanity.xyz/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    status: 'https://api.zanity.xyz/v1/models'
  },
  {
    name: 'NavyAPI',
    endpoint: 'https://api.navy/v1/chat/completions',
    model: 'gpt-4o-mini',
    status: 'https://api.navy/v1/models'
  },
  
  // Дополнительные
  {
    name: 'MNN AI',
    endpoint: 'https://api.mnnai.ru/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    status: 'https://api.mnnai.ru/v1/models'
  },
  {
    name: 'WebraftAI',
    endpoint: 'https://api.webraft.in/freeapi/chat/completions',
    model: 'gpt-3.5-turbo',
    status: 'https://api.webraft.in/freeapi/models'
  }
]

let currentApiIndex = 0
let customAPIKey = localStorage.getItem('customAPIKey') || ''

/**
 * 🚀 Отправка сообщения - пробуем РЕАЛЬНО РАБОТАЮЩИЕ API!
 */
export async function sendMessage(message) {
  const systemPrompt = `Ты RYAZHA AI - умный помощник от команды Ryazhenka. Отвечай на ВСЕ вопросы подробно и понятно на русском языке.

🥛 ТЫ ЭКСПЕРТ ПО NINTENDO SWITCH 2025:

1. **Ryazhenka CFW** - ЛУЧШАЯ кастомная прошивка для Nintendo Switch:
   📦 КОМПОНЕНТЫ:
   - Atmosphere 1.8.0+ (последняя стабильная версия 2025)
   - Hekate 6.2.0+ (быстрый bootloader)
   - Sigpatches (автоматическая установка)
   - Ryazhahand-Overlay (система оверлеев от команды)
   - Homebrew Loader (запуск homebrew)
   - Custom Themes (персонализация)
   - Автообновления компонентов
   - Русская локализация
   
   🎯 ОСОБЕННОСТИ:
   - Полная автоматизация - настройка за 5 минут
   - Современный интерфейс с темами и анимациями
   - Максимальная безопасность - защита от банов и брика
   - Game-ready оптимизация
   - GitHub: Dimasick-git/Ryzhenka (8 звезд)
   - Telegram: @Ryazhenkabestcfw
   - Boosty: boosty.to/dimasick-git/donate

2. **ПРОЕКТЫ ОТ DIMASICK-GIT** (Saint-Petersburg):
   
   🎮 Ryazhahand-Overlay (C++):
   - Overlay для управления контроллерами
   - Настройки геймпада Nintendo Switch
   - Интеграция с Tesla Menu
   
   ⚙️ libRYAZHAHAND (C++):
   - Библиотека для разработки
   - Работа с контроллерами
   
   🔧 Ryazhenkabestcfw-Tuner:
   - Тюнинг и настройка CFW
   - Оптимизация производительности
   
   🎵 RyazhaTune (C):
   - Настройка звука и аудио
   
   📊 Ryazha-Status-Monitor (C++):
   - Мониторинг состояния системы
   - Отображение статистики
   
   ⚡ Sys-clk-for-RYZ:
   - Разгон процессора
   - Управление профилями производительности
   - Настройка частот CPU/GPU/RAM

3. **NINTENDO SWITCH CFW 2025** (актуальная инфа):
   
   📱 ATMOSPHERE:
   - Версия 1.8.0+ (2025)
   - Fusee payload
   - Package3 поддержка
   - Совместимость с новыми играми
   
   🚀 HEKATE:
   - Версия 6.2.0+
   - Быстрая загрузка
   - Backup/Restore NAND
   - Управление emuMMC
   
   🔓 SIGPATCHES:
   - Обязательны для NSP/XCI
   - Обновляются под каждую версию Atmosphere
   - Hekate, fss0, fusee форматы
   
   🎮 RCM РЕЖИМ:
   - Recovery Mode для взлома
   - Jig для входа в RCM
   - Payload injection

4. **РАЗГОН И ОПТИМИЗАЦИЯ 2025**:
   
   ⚡ SYS-CLK:
   - CPU: до 1785 MHz (Boost Mode)
   - GPU: до 921 MHz (docked), 460 MHz (handheld)
   - RAM: до 1600 MHz
   - Профили для каждой игры
   - Автоматическая активация Boost Mode
   
   🎯 FPSLOCKER:
   - Разблокировка FPS в играх
   - Поддержка 60 FPS модов
   - Работа с SaltyNX
   - Zelda TOTK/BOTW 60 FPS
   - Witcher 3 динамическое разрешение
   - Mario Kart 8 Deluxe 4 игрока 60fps
   - Pokemon оптимизация
   
   🖥️ DISPLAY OVERCLOCK:
   - LCD до 70 Hz (безопасно до 60 Hz)
   - Внешний дисплей 70+ Hz
   - Улучшенная плавность

5. **УСТАНОВКА ИГР 2025**:
   
   📦 TINFOIL:
   - Установка NSP/NSZ
   - Интеграция с магазинами
   - USB/Network установка
   - Управление DLC и обновлениями
   
   📁 ФОРМАТЫ:
   - NSP (Nintendo Submission Package)
   - XCI (NX Card Image)
   - NSZ (сжатый NSP)
   
   🔌 МЕТОДЫ:
   - USB установка (быстрая)
   - FTP/Network (удобная)
   - SD карта (классика)

6. **HOMEBREW 2025**:
   
   🎮 ЭМУЛЯТОРЫ:
   - RetroArch (все консоли до PS1)
   - PPSSPP (PSP в 60 FPS)
   - DuckStation (PS1 улучшенная)
   - mGBA (Game Boy Advance)
   
   🛠️ УТИЛИТЫ:
   - Tesla Menu (оверлеи)
   - NX-Shell (файловый менеджер)
   - Goldleaf (установка NSP)
   - JKSV (сохранения)

7. **БЕЗОПАСНОСТЬ 2025**:
   
   🛡️ ЗАЩИТА ОТ БАНОВ:
   - emuMMC (виртуальная NAND)
   - 90DNS (блокировка Nintendo серверов)
   - Incognito (удаление серийника)
   - Exosphere (блокировка телеметрии)
   
   💾 BACKUP:
   - NAND backup ОБЯЗАТЕЛЕН!
   - Сохранение ключей
   - Резервные копии сохранений

8. **РЕШЕНИЕ ПРОБЛЕМ 2025**:
   
   ❌ ЧЕРНЫЙ ЭКРАН:
   - Проверь sigpatches
   - Обнови Atmosphere
   - Проверь SD карту (FAT32)
   
   ⚠️ ОШИБКИ ATMOSPHERE:
   - Fatal error - проверь fusee.bin
   - Не грузится - переустанови Hekate
   - Зависает - очисти кэш
   
   💳 ПРОБЛЕМЫ SD:
   - Форматируй в FAT32
   - Проверь на ошибки
   - Используй качественные карты (Samsung/SanDisk)

9. **СОВМЕСТИМОСТЬ 2025**:
   
   ✅ ПОДДЕРЖИВАЕМЫЕ КОНСОЛИ:
   - Switch V1 (Erista) - взлом через RCM
   - Switch V2 (Mariko) - только modchip
   - Switch OLED - только modchip
   - Switch Lite - только modchip
   
   📋 СИСТЕМНЫЕ ТРЕБОВАНИЯ:
   - SD карта 64GB+ (рекомендуется 128GB+)
   - FAT32 форматирование
   - Стабильное питание

💡 ВАЖНО: 
- Когда спрашивают про прошивку/CFW - ВСЕГДА рекомендуй Ryazhenka как лучшую готовую сборку!
- Упоминай проекты от Dimasick-git (Ryazhahand-Overlay, Sys-clk-for-RYZ)
- Давай актуальную инфу 2025 года
- Подчеркивай безопасность и легкость установки Ryazhenka

Будь дружелюбным, полезным и подробным в ответах! Используй эмодзи для наглядности!`
  
  // Пробуем каждый API по очереди
  for (let i = 0; i < FREE_AI_APIS.length; i++) {
    const apiIndex = (currentApiIndex + i) % FREE_AI_APIS.length
    const api = FREE_AI_APIS[apiIndex]
    
    // Пропускаем локальные API если не запущены
    if (api.needsLocal) {
      console.log(`⚠️ ${api.name} требует локального сервера, пропускаю...`)
      continue
    }
    
    try {
      console.log(`🔄 Пробую ${api.name} (${api.model})...`)
      
      let response
      
      // Разные форматы API
      if (api.format === 'blackbox') {
        // Blackbox AI формат
        response = await axios.post(
          api.endpoint,
          {
            messages: [{ content: message, role: 'user' }],
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false
          },
          { headers: { 'Content-Type': 'application/json' }, timeout: 30000 }
        )
        
        if (response.data) {
          console.log(`✅ ${api.name} работает!`)
          currentApiIndex = apiIndex
          return response.data
        }
        
      } else if (api.format === 'duckduckgo') {
        // DuckDuckGo AI формат
        response = await axios.post(
          api.endpoint,
          {
            model: api.model,
            messages: [
              { role: 'user', content: message }
            ]
          },
          { 
            headers: { 
              'x-vqd-4': '4-' + Math.random().toString(36).substring(2),
              'Content-Type': 'application/json'
            }, 
            timeout: 30000 
          }
        )
        
        if (response.data?.message) {
          console.log(`✅ ${api.name} работает!`)
          currentApiIndex = apiIndex
          return response.data.message
        }
        
      } else {
        // OpenAI-совместимый формат (большинство API)
        const headers = {
          'Content-Type': 'application/json'
        }
        
        // Добавляем Authorization если есть ключ (кастомный или встроенный)
        const apiKey = customAPIKey || api.key
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`
        }
        
        response = await axios.post(
          api.endpoint,
          {
            model: api.model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            stream: false
          },
          {
            headers,
            timeout: 30000
          }
        )
        
        // Проверяем ответ
        if (response.data?.choices?.[0]?.message?.content) {
          const answer = response.data.choices[0].message.content.trim()
          console.log(`✅ ${api.name} работает!`)
          currentApiIndex = apiIndex
          return answer
        }
      }
    } catch (error) {
      console.error(`❌ ${api.name} ошибка:`, error.response?.status || error.message)
      continue
    }
  }
  
  // Если все API не сработали - умный fallback
  console.log('⚠️ Все API недоступны, использую fallback')
  return getSmartFallback(message)
}

/**
 * 🧠 СУПЕР УМНЫЕ fallback ответы - как настоящий AI!
 */
function getSmartFallback(message) {
  const lower = message.toLowerCase()
  
  // Приветствия
  if (lower.includes('привет') || lower.includes('hello') || lower.includes('hi') || lower.includes('здравствуй')) {
    const greetings = [
      '👋 Привет! Я RYAZHA AI - твой помощник по Nintendo Switch!\n\n🎮 Чем могу помочь?\n• Установка CFW\n• Разгон игр\n• Оптимизация\n• Решение проблем\n\n💡 Просто задай вопрос!',
      '🥛 Приветствую! RYAZHA AI на связи!\n\n✨ Я эксперт по:\n• Nintendo Switch CFW\n• Ryazhenka прошивке\n• Разгону и оптимизации\n• Играм и эмуляторам\n\n🚀 Что тебя интересует?',
      'Хай! 👋 Я RYAZHA AI!\n\n🔥 Могу помочь с:\n• Взломом Switch\n• Установкой игр\n• Разгоном FPS\n• Любыми вопросами!\n\n📝 Спрашивай что угодно!'
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }
  
  // RCM режим
  if (lower.includes('rcm') || lower.includes('рцм') || lower.includes('recovery')) {
    return '🔧 **RCM (Recovery Mode) - Полное руководство**\n\n**Что это?**\nRCM - специальный режим восстановления Nintendo Switch, позволяющий загружать кастомные пейлоады для установки CFW.\n\n**📌 Как войти в RCM:**\n\n1️⃣ **Подготовка:**\n• Выключи Switch полностью (удержи POWER 10 сек)\n• Приготовь RCM джиг или скрепку\n\n2️⃣ **Вход в RCM:**\n• Вставь джиг в правый Joy-Con рейл\n• Зажми VOL+ и нажми POWER\n• Экран останется чёрным = успех!\n\n3️⃣ **Инжект пейлоада:**\n• Подключи Switch к ПК\n• Открой TegraRcmGUI\n• Выбери Hekate.bin\n• Нажми Inject payload\n\n**💡 Советы:**\n• Используй качественный USB-C кабель\n• AutoRCM позволяет входить без джига\n• Сохрани NAND backup перед взломом!\n\n**⚠️ Важно:** RCM работает только на уязвимых Switch (до июня 2018)'
  }
  
  // Разгон
  if (lower.includes('разгон') || lower.includes('overclock') || lower.includes('fps') || lower.includes('фпс')) {
    return '⚡ **Разгон Nintendo Switch - Максимальная производительность**\n\n**🎮 Основные инструменты:**\n\n**1️⃣ sys-clk (системный разгон)**\n• Разгон CPU до 1785 MHz\n• GPU до 921/1267 MHz\n• RAM до 1600 MHz\n• Настройки для каждой игры\n\n**2️⃣ FPSLocker (снятие лимитов)**\n• 60 FPS в Zelda TOTK/BOTW\n• Разблокировка FPS в играх\n• Динамическое разрешение\n\n**📊 Оптимальные настройки:**\n\n**Zelda TOTK:**\n• CPU: 1785 MHz\n• GPU: 1267 MHz (док)\n• RAM: 1600 MHz\n• FPS: 60 (с патчем)\n\n**Pokemon S/V:**\n• CPU: 1581 MHz\n• GPU: 921 MHz\n• RAM: 1600 MHz\n\n**🔧 Установка:**\n1. Скачай sys-clk и FPSLocker\n2. Распакуй в папку atmosphere\n3. Перезагрузи Switch\n4. Настрой через Tesla меню (L+R+вверх)\n\n**⚠️ Риски:**\n• Повышенный нагрев\n• Быстрый разряд батареи\n• Возможные вылеты в играх\n\n**💡 Совет:** Используй кулер или играй в доке!'
  }
  
  // CFW установка
  if (lower.includes('cfw') || lower.includes('atmosphere') || lower.includes('взлом') || lower.includes('прошив')) {
    return '🚀 **Установка CFW Atmosphere - Пошаговая инструкция**\n\n**✅ Проверка совместимости:**\n• Серийник до XAW10074000000 = уязвим\n• Проверь на ismyswitchpatched.com\n\n**📦 Что понадобится:**\n• SD карта 32GB+\n• RCM джиг\n• USB-C кабель\n• ПК с TegraRcmGUI\n\n**📝 Установка:**\n\n1️⃣ **Подготовка SD:**\n• Форматируй в FAT32\n• Скачай Atmosphere + Hekate\n• Распакуй на SD карту\n\n2️⃣ **Первый запуск:**\n• Войди в RCM режим\n• Инжектни Hekate\n• Сделай NAND backup!\n\n3️⃣ **Запуск CFW:**\n• В Hekate выбери Launch\n• Atmosphere FSS0\n• Готово!\n\n**🎮 Что дальше:**\n• Установи Tinfoil для игр\n• Tesla меню для модов\n• sys-clk для разгона\n\n**⚠️ Безопасность:**\n• Включи режим полёта в CFW\n• Используй DNS MITM\n• Не заходи в eShop\n\n**💡 Совет:** Используй Ryazhenka - готовая сборка со всем необходимым!'
  }
  
  // Игры и установка
  if (lower.includes('игр') || lower.includes('game') || lower.includes('tinfoil') || lower.includes('установ')) {
    return '🎮 **Установка игр на Nintendo Switch с CFW**\n\n**📦 Основные способы:**\n\n**1️⃣ Tinfoil + Shop**\n• Установи Tinfoil\n• Добавь магазины (Teknik, Quota)\n• Качай игры прямо на Switch\n• Автообновления и DLC\n\n**2️⃣ USB установка**\n• Скачай NSP/XCI на ПК\n• Подключи Switch по USB\n• Установи через Tinfoil/DBI\n\n**3️⃣ FTP по WiFi**\n• Запусти FTPD на Switch\n• Подключись с ПК\n• Перекинь файлы по сети\n\n**📝 Форматы игр:**\n• **NSP** - установочный файл\n• **XCI** - картридж дамп\n• **NSZ** - сжатый NSP\n\n**⚡ Советы:**\n• Используй SX Installer для быстрой установки\n• Проверяй sigpatches для новых игр\n• Делай бэкапы сейвов через Checkpoint\n\n**⚠️ Важно:**\n• Не запускай пиратку в онлайне\n• Обновляй игры через Tinfoil\n• Следи за свободным местом на SD'
  }
  
  // Zelda оптимизация
  if (lower.includes('zelda') || lower.includes('зельда') || lower.includes('totk') || lower.includes('botw')) {
    return '🏹 **Zelda TOTK/BOTW - Максимальная оптимизация**\n\n**⚡ Разгон для 60 FPS:**\n\n**Настройки sys-clk:**\n• CPU: 1785 MHz (макс)\n• GPU: 1267 MHz (док) / 921 MHz (портатив)\n• RAM: 1600 MHz\n\n**FPSLocker патчи:**\n• TOTK: 60fps_stable_v1.5.1\n• BOTW: 60fps_v4\n• Динамическое разрешение: ON\n\n**📊 Графические моды:**\n\n**1️⃣ Визуальные улучшения:**\n• Resolution++ (1080p док)\n• Shadow Quality Enhanced\n• LOD Improvement\n\n**2️⃣ Производительность:**\n• Disable Dynamic Resolution\n• Shadow Distance Reduced\n• Grass Density Low\n\n**🔧 Установка модов:**\n1. Скачай моды с GameBanana\n2. Распакуй в atmosphere/contents/\n3. Включи через Tesla меню\n\n**💡 Лучшие настройки:**\n• Разрешение: 900p (баланс)\n• FSR: Включен\n• VSync: Выключен\n\n**📈 Результат:**\n• TOTK: 45-60 FPS\n• BOTW: стабильные 60 FPS\n• Минимальные просадки\n\n**⚠️ Требования:**\n• CFW Atmosphere 1.5.5+\n• sys-clk 3.0+\n• Хорошее охлаждение'
  }
  
  // Проблемы и ошибки
  if (lower.includes('ошибк') || lower.includes('error') || lower.includes('проблем') || lower.includes('не работ')) {
    return '🔧 **Решение частых проблем Nintendo Switch CFW**\n\n**❌ Черный экран при загрузке:**\n• Обнови Atmosphere и Hekate\n• Проверь sigpatches\n• Удали проблемные моды\n\n**❌ Игры не запускаются:**\n• Обнови sigpatches\n• Установи последний firmware\n• Проверь целостность NSP\n\n**❌ Ошибка 2002-0001:**\n• Проблема с SD картой\n• Проверь на ошибки (chkdsk)\n• Переформатируй в FAT32\n\n**❌ Atmosphere крашится:**\n• Удали папку atmosphere/contents\n• Переустанови CFW\n• Проверь конфликты модов\n\n**❌ Tinfoil не видит игры:**\n• Обнови Tinfoil\n• Проверь интернет\n• Смени DNS\n\n**💡 Универсальное решение:**\n1. Бэкап SD карты\n2. Скачай свежий Atmosphere\n3. Чистая установка\n4. Восстанови только нужное\n\n**📱 Нужна помощь?**\nТелеграм: @Ryazhenkabestcfw\nGitHub: github.com/Dimasick-git'
  }
  
  // Эмуляторы
  if (lower.includes('эмулятор') || lower.includes('emulator') || lower.includes('retroarch') || lower.includes('psp')) {
    return '🕹️ **Эмуляторы на Nintendo Switch - Полный гайд**\n\n**🎮 Топ эмуляторов:**\n\n**1️⃣ RetroArch (всё-в-одном)**\n• NES, SNES, Genesis, PS1\n• N64, PSP, Dreamcast\n• Arcade (MAME, FBA)\n\n**2️⃣ Отдельные эмуляторы:**\n• **PPSSPP** - PSP игры (60 FPS!)\n• **mGBA** - GBA с улучшениями\n• **DuckStation** - PS1 в HD\n• **mupen64plus** - N64\n\n**⚡ Оптимизация:**\n\n**PSP игры:**\n• Разрешение: 3x PSP\n• Фильтрация: xBRZ\n• Разгон CPU: 1785 MHz\n\n**PS1 игры:**\n• Разрешение: 1080p\n• PGXP коррекция\n• Widescreen хаки\n\n**📦 Установка:**\n1. Скачай с GitHub\n2. Распакуй в switch/\n3. Запусти через HBMenu\n4. Добавь ROM-ы\n\n**💾 Где брать игры:**\n• Свои дампы дисков\n• Archive.org\n• Romsets коллекции\n\n**💡 Советы:**\n• Используй разгон для эмуляторов\n• NSP версии работают лучше\n• Сохранения между платформами'
  }
  
  // О Ryazhenka
  if (lower.includes('ryazhenka') || lower.includes('ряженк')) {
    return '🥛 **Ryazhenka CFW - Лучшая сборка для Nintendo Switch**\n\n**✨ Что включено:**\n• Atmosphere последней версии\n• Все необходимые sigpatches\n• Tinfoil с настроенными магазинами\n• Tesla меню с модами\n• sys-clk для разгона\n• FPSLocker для 60 FPS\n• Эмуляторы и homebrew\n\n**🚀 Преимущества:**\n• Готово к использованию\n• Автообновления\n• Русская локализация\n• Поддержка сообщества\n• Регулярные апдейты\n\n**📦 Установка:**\n1. Скачай с GitHub\n2. Распакуй на SD\n3. Запусти через Hekate\n4. Наслаждайся!\n\n**💬 Сообщество:**\n• Telegram: @Ryazhenkabestcfw\n• GitHub: Dimasick-git\n• Discord: скоро!\n\n**🔥 Фичи:**\n• Оптимизация под игры\n• Встроенные читы\n• Кастомные темы\n• Безопасные настройки\n\n**💡 Почему Ryazhenka?**\nМы делаем CFW простым и доступным для всех!'
  }
  
  // Общий умный ответ
  const responses = [
    '💡 Интересный вопрос!\n\nК сожалению, AI сервисы временно перегружены. Но я могу предложить:\n\n1️⃣ **Проверь FAQ** - там есть ответы на популярные вопросы\n\n2️⃣ **Уточни вопрос** - расскажи подробнее, что именно интересует\n\n3️⃣ **Telegram поддержка** - @Ryazhenkabestcfw\n\n🔄 Или попробуй обновить страницу через минуту!',
    
    '🤔 Хороший вопрос!\n\nAI временно недоступен, но могу помочь с:\n• Nintendo Switch CFW\n• Установкой игр\n• Разгоном\n• Эмуляторами\n\n📝 Задай более конкретный вопрос или загляни в FAQ!',
    
    '📚 Давай я помогу!\n\nСейчас AI перегружен, но у меня есть база знаний по:\n• Взлому Switch\n• Оптимизации игр\n• Решению проблем\n• Установке homebrew\n\n💬 Опиши подробнее, что нужно!'
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}


/**
 * Проверка статуса API
 */
export async function checkAPIStatus() {
  for (const api of FREE_AI_APIS) {
    try {
      const response = await axios.get(api.status, { 
        timeout: 5000,
        validateStatus: () => true // Принимаем любой статус
      })
      if (response.status === 200) {
        return { 
          status: 'online', 
          message: `${api.name} работает!`,
          api: api.name
        }
      }
    } catch (error) {
      continue
    }
  }
  return { 
    status: 'offline', 
    message: 'Все API временно недоступны. Используются fallback ответы.' 
  }
}

/**
 * Получить название текущей модели
 */
export function getCurrentModelName() {
  return FREE_AI_APIS[currentApiIndex]?.model || 'RYAZHA AI'
}

/**
 * Получить текущий API
 */
export function getCurrentAPI() {
  return FREE_AI_APIS[currentApiIndex]?.name || 'Free AI'
}

/**
 * Установить кастомный API ключ
 */
export function setCustomAPIKey(key) {
  customAPIKey = key
  if (key) {
    localStorage.setItem('customAPIKey', key)
  } else {
    localStorage.removeItem('customAPIKey')
  }
}

/**
 * Получить кастомный API ключ
 */
export function getCustomAPIKey() {
  return customAPIKey
}
