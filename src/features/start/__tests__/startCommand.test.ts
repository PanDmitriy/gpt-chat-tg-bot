import { startCommand } from '../startCommand';
import { Context } from 'telegraf';

test('startCommand should send a welcome message', () => {
    const ctx = {
        reply: jest.fn(),
        from: { first_name: 'Dmitry' }
    } as unknown as Context;

    startCommand(ctx);
    expect(ctx.reply).toHaveBeenCalledWith('Welcome to GPT Chat Bot, Dmitry!');
});
