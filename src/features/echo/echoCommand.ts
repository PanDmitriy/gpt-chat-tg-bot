import { Context } from 'telegraf';

export function echoCommand(ctx: Context) {
    const text = ctx.message?.text || '';
    const args = text.split(' ').slice(1);
    ctx.reply(`You said: ${args.join(' ')}`);
}
