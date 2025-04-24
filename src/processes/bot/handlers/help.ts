import { Context } from 'telegraf';
import { BotContext } from '../types';

export async function handleHelp(ctx: Context & BotContext): Promise<void> {
  const message = `
🤖 *Доступные команды:*

/mars - Получить фотографии с Марса
/earth - Получить фотографию Земли
/iss - Узнать текущее положение МКС
/asteroids - Получить информацию о ближайших астероидах
/help - Показать это сообщение

*Навигация по фотографиям Марса:*
- Используйте кнопки "Назад" и "Вперед" для просмотра фотографий
- В центре отображается текущий номер фотографии
  `.trim();

  await ctx.reply(message, { parse_mode: 'Markdown' });
} 