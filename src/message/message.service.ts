import TelegramBot, { Message } from 'node-telegram-bot-api';
import { TgBot } from '../bot/bot.decorator';

@TgBot
export class MessageService {
  private readonly bot: TelegramBot;

  public start(msg: Message): Promise<Message> {
    const { chat, from } = msg;
    return this.bot.sendMessage(chat.id, `Добро пожаловать, ${from?.first_name}! Чтобы получить доступ к командам введите /menu`);
  }

  public getMenu(msg: Message): Promise<Message> {
    const { chat } = msg;
    return this.bot.sendMessage(chat.id, 'Вот мои команды', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Добавить бота', callback_data: JSON.stringify({ type: 'addBot' }) },
            { text: 'Мои боты', callback_data: JSON.stringify({ type: 'bots' }) },
          ],
        ],
      },
    });
  }
}
