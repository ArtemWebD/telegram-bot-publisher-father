import TelegramBot, { CallbackQuery, Message, User } from 'node-telegram-bot-api';
import { exec } from 'child_process';
import { TgBot } from '../bot/bot.decorator';
import { TaskManager } from '../task-manager/TaskManager';
import { CustomBotConsumer } from './custom-bot.consumer';
import Database from '../database/Database';
import { Repository } from 'typeorm';
import { BotActive, CustomBotEntity } from './entities/custom-bot.entity';
import axios from 'axios';

@TgBot
export class CustomBotService {
  private readonly bot: TelegramBot;
  private readonly taskManager = TaskManager.getInstance();
  private readonly database = Database.getInstance();
  private readonly customBotRepository: Repository<CustomBotEntity> =
    this.database.getRepository(CustomBotEntity);

  public addBot(query: CallbackQuery): Promise<Message> {
    this.taskManager.addTask({
      chatId: query.from.id,
      consumer: CustomBotConsumer,
      methods: [],
      cancel: '/cancel',
      cancelCallback: (msg: Message) => {
        return this.bot.sendMessage(msg.chat.id, 'Добавление бота отменено');
      },
    });
    return this.bot.sendMessage(query.from.id, 'Отправьте токен вашего бота');
  }

  public async getBots(query: CallbackQuery): Promise<Message> {
    try {
      const bots = await this.customBotRepository.findBy({ userId: query.from.id });
      if (!bots.length) {
        return this.bot.sendMessage(query.from.id, 'Вы пока не создали ни одного бота');
      }
      return this.bot.sendMessage(query.from.id, 'Вот ваши боты', {
        reply_markup: {
          inline_keyboard: bots.map((bot) => {
            return [
              { text: bot.firstname, callback_data: JSON.stringify({ type: 'bot', data: bot.id }) },
            ];
          }),
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getBot(id: number, query: CallbackQuery): Promise<Message> {
    try {
      const bot = await this.customBotRepository.findOneBy({ id });
      if (!bot) {
        return this.bot.sendMessage(query.from.id, 'Бот не найден');
      }
      return this.bot.sendMessage(
        query.from.id,
        `Бот: ${bot.firstname}\n\n` + `Статус: ${bot.active}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Запустить',
                  callback_data: JSON.stringify({ type: 'startBot', data: bot.id }),
                },
                {
                  text: 'Остановить',
                  callback_data: JSON.stringify({ type: 'stopBot', data: bot.id }),
                },
              ],
              [
                {
                  text: 'Удалить',
                  callback_data: JSON.stringify({ type: 'deleteBot', data: bot.id }),
                },
              ],
            ],
          },
        },
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async deleteBot(id: number, query: CallbackQuery): Promise<Message> {
    try {
      const bot = await this.customBotRepository.findOneBy({ id });
      if (!bot) {
        return this.bot.sendMessage(query.from.id, 'Бот не найден');
      }
      await this.stop(bot.name);
      await this.deleteImage(bot.name);
      await this.customBotRepository.delete({ id });
      return this.bot.sendMessage(query.from.id, `Бот успешно остановлен и удален`);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async stopBot(id: number, query: CallbackQuery): Promise<Message> {
    try {
      const bot = await this.customBotRepository.findOneBy({ id });
      if (!bot) {
        return this.bot.sendMessage(query.from.id, 'Бот не найден');
      }
      if (bot.active === BotActive.paused) {
        return this.bot.sendMessage(query.from.id, 'Бот уже остановлен');
      }
      await this.stop(bot.name);
      bot.active = BotActive.paused;
      await this.customBotRepository.save(bot);
      return this.bot.sendMessage(query.from.id, 'Бот успешно остановлен');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async restartBot(id: number, query: CallbackQuery): Promise<Message> {
    try {
      const bot = await this.customBotRepository.findOneBy({ id });
      if (!bot) {
        return this.bot.sendMessage(query.from.id, 'Бот не найден');
      }
      if (bot.active === BotActive.on) {
        return this.bot.sendMessage(query.from.id, 'Бот уже запущен');
      }
      await this.start(bot.name);
      bot.active = BotActive.on;
      await this.customBotRepository.save(bot);
      return this.bot.sendMessage(query.from.id, 'Бот успешно запущен, через несколько секунд он приступит к работе');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public start(name: string): Promise<void> {
    try {
      return new Promise<void>((resolve, reject) => {
        exec(`docker run -d --rm --name ${name}-container ${name}`, (error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getFirstname(token: string): Promise<User> {
    try {
      const response = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
      return response.data.result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private stop(name: string): Promise<void> {
    try {
      return new Promise<void>((resolve, reject) => {
        exec(`docker stop ${name}-container`, (error) => {
          resolve();
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private deleteImage(name: string): Promise<void> {
    try {
      return new Promise<void>((resolve, reject) => {
        exec(`docker rmi -f ${name}`, (error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
