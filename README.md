# NASA Telegram Bot

Telegram бот для получения информации о космосе, фотографий с марсоходов, МКС и других космических данных через NASA API.

## Возможности

- 🌅 Фото дня от NASA (APOD)
- 🛰️ Отслеживание местоположения МКС
- 🌍 Фотографии Земли из космоса
- 🚀 Фотографии с марсоходов (Curiosity, Perseverance)
- ☄️ Информация о ближайших астероидах

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/nasa-telegram-bot.git
cd nasa-telegram-bot
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

4. Заполните необходимые переменные окружения в файле `.env`:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NASA_API_KEY=your_nasa_api_key
```

## Запуск

### Режим разработки
```bash
npm run dev
```

### Продакшн режим
```bash
npm run build
npm start
```

## Команды бота

- `/start` - Начало работы с ботом
- `/apod` - Получить фото дня от NASA
- `/iss` - Узнать текущее местоположение МКС
- `/earth` - Посмотреть последний снимок Земли из космоса
- `/mars` - Посмотреть последние фотографии с марсоходов
- `/curiosity` - Фотографии с марсохода Curiosity
- `/perseverance` - Фотографии с марсохода Perseverance
- `/asteroids` - Информация о ближайших астероидах

## Технологии

- TypeScript
- Node.js
- Telegraf.js
- NASA API
- Axios

## Разработка

### Структура проекта
```
src/
  ├── main.ts          # Основной файл бота
  ├── nasa.ts          # Работа с NASA API
  ├── types/           # TypeScript типы
  └── utils/           # Вспомогательные функции
```

### Скрипты
- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Компиляция TypeScript
- `npm start` - Запуск в продакшн режиме
- `npm run clean` - Очистка скомпилированных файлов

## Лицензия

MIT 