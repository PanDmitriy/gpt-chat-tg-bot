import { Telegraf } from 'telegraf';
import { setupHandlers } from '../features';
import { BOT_TOKEN } from '../shared/config';
import { BotContext } from '../shared/types';

const bot = new Telegraf<BotContext>(BOT_TOKEN);

bot.use(async (ctx, next) => {
    console.log(`Received a message from ${ctx.from?.username}`);
    await next();
});

setupHandlers(bot);
bot.launch();
