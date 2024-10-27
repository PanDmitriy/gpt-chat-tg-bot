// src/features/index.ts
import { Telegraf } from 'telegraf';
import { startCommand } from './start/startCommand';
import { helpCommand } from './help/helpCommand';
import { echoCommand } from './echo/echoCommand';
import { showMenu } from '../widgets/menu/menuWidget';

export function setupHandlers(bot: Telegraf) {
    bot.start(startCommand);
    bot.command('help', helpCommand);
    bot.command('echo', echoCommand);
    bot.command('menu', showMenu);

    bot.on('callback_query', async (ctx) => {
        const data = ctx.callbackQuery?.data;

        if (data === 'help') {
            helpCommand(ctx);
        } else if (data === 'echo') {
            ctx.reply('Use /echo command with a message to repeat it!');
        }
        await ctx.answerCbQuery(); // Закрываем callback запрос
    });
}
