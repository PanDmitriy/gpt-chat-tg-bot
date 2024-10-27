import { Context } from 'telegraf';
import { createUser, getUserById } from '../../entities/user/userService';

export function startCommand(ctx: Context) {
    const userId = ctx.from?.id;
    const username = ctx.from?.username || '';
    const firstName = ctx.from?.first_name || '';
    const lastName = ctx.from?.last_name;

    if (userId && !getUserById(userId)) {
        createUser(userId, username, firstName, lastName);
    }

    ctx.reply(`Welcome to GPT Chat Bot, ${firstName}!`);
}
