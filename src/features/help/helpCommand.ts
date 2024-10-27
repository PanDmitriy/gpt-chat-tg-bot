import { Context } from 'telegraf';

export function helpCommand(ctx: Context) {
    ctx.reply('Available commands: /start, /help');
}
