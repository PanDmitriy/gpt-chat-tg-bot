import dotenv from 'dotenv';
dotenv.config();

import { Telegraf, Context } from 'telegraf';
import { code } from 'telegraf/format';
import { nasa } from './nasa.js';
import { Command, NasaPhoto, ISSLocation, EPICImage } from './types/index.js';
import { InlineKeyboard } from 'telegraf/typings/core/types/typegram';

interface BotContext extends Context {
  session?: any;
}

const COMMANDS: Command[] = [
  { command: "start", description: "Запуск" },
  { command: "apod", description: "NASA. Астрономическое фото дня" },
  { command: "iss", description: "Показывает, где сейчас находится МКС" },
  { command: "earth", description: "Показывает последний снимок Земли из космоса" }
];

const bot = new Telegraf<BotContext>(process.env.TELEGRAM_BOT_TOKEN || '');
bot.telegram.setMyCommands(COMMANDS);

/** Обработка команд */
bot.command('start', async (ctx) => {
  await ctx.reply('Добро пожаловать в NASA бот! Используйте команды:\n' +
    '/apod - получить фото дня\n' +
    '/iss - узнать где МКС');
});

/** NASA */
bot.command('apod', async (ctx) => {
  try {
    const photo = await nasa.getPhotoOfDay();
    await ctx.replyWithPhoto(photo.url, { caption: photo.title });
    await ctx.reply(photo.explanation);
    if (photo.copyright) {
      await ctx.reply(`Автор ${photo.copyright}`);
    }
  } catch (error) {
    await ctx.reply('Произошла ошибка при получении фото дня');
    console.error('Error in apod command:', error);
  }
});

bot.command('iss', async (ctx) => {
  try {
    const data = await nasa.getISSLocation();
    
    const date = new Date(data.timestamp * 1000);
    const formattedDate = date.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const message = `🛰️ *Международная космическая станция*\n\n` +
      `🌍 *Координаты:*\n` +
      `Широта: ${data.latitude.toFixed(4)}°\n` +
      `Долгота: ${data.longitude.toFixed(4)}°\n\n` +
      `📊 *Параметры орбиты:*\n` +
      `Скорость: ${(data.velocity * 3.6).toFixed(2)} км/ч\n` +
      `Высота: ${data.altitude.toFixed(2)} км\n` +
      `Видимость: ${data.visibility}\n` +
      `Зона покрытия: ${data.footprint.toFixed(2)} км\n\n` +
      `☀️ *Солнечная позиция:*\n` +
      `Широта: ${data.solar_lat.toFixed(2)}°\n` +
      `Долгота: ${data.solar_lon.toFixed(2)}°\n\n` +
      `🕒 *Время обновления:*\n` +
      `${formattedDate}`;

    // Создаем кнопки для навигационных приложений
    const keyboard = {
      inline_keyboard: [
        [
          { text: '🗺️ Google Maps', url: `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}` },
          { text: '📍 Яндекс.Карты', url: `https://yandex.ru/maps/?text=${data.latitude},${data.longitude}` }
        ],
      ]
    };

    await ctx.reply(message, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  } catch (error) {
    console.error('Error in iss command:', error);
    await ctx.reply('🚫 Произошла ошибка при получении данных о МКС. Попробуйте позже.');
  }
});

bot.command('earth', async (ctx) => {
  try {
    const image = await nasa.getEarthImage();
    
    const date = new Date(image.date);
    const formattedDate = date.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const message = `🌍 *Снимок Земли из космоса*\n\n` +
      `📅 Дата: ${formattedDate}\n` +
      `📍 Координаты съемки:\n` +
      `Широта: ${image.lat.toFixed(2)}°\n` +
      `Долгота: ${image.lon.toFixed(2)}°\n\n` +
      `🛰️ Снято с космического аппарата DSCOVR`;

    await ctx.replyWithPhoto(image.image, {
      caption: message,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error in earth command:', error);
    await ctx.reply('🚫 Произошла ошибка при получении снимка Земли. Попробуйте позже.');
  }
});

/** Start bot */
bot.launch();

/** Обработка остановки NODE */
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 