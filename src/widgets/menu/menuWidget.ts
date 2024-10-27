// src/widgets/menu/menuWidget.ts
import { Context } from 'telegraf';

export function showMenu(ctx: Context) {
    ctx.reply('Here is the main menu. Choose an option:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Help', callback_data: 'help' }],
                [{ text: 'Echo', callback_data: 'echo' }]
            ]
        }
    });
}
