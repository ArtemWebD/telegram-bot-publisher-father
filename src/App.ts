import TelegramBot from "node-telegram-bot-api";
import { TgBot } from "./bot/bot.decorator";
import { CustomBotModule } from "./custom-bot/custom-bot.module";
import MessageModule from "./message/message.module";
import { TaskManager } from './task-manager/TaskManager';

/**
 * The class in which all modules that listen for bot events are launched.
 * All modules must have a main method in which the corresponding events are listened to.
 * The basic settings of the bot are also made here, for example, the installation of commands.
 */
@TgBot
export default class BotApp {
  private readonly bot: TelegramBot;
  private readonly taskManager = TaskManager.getInstance();

  public init() {
    try {
      this.taskManager.init();
      new MessageModule();
      new CustomBotModule();
      this.setCommands();
    } catch (error) {
      console.log(error);
    }
  }

  private setCommands() {
    this.bot.setMyCommands([{ command: '/menu', description: 'Команды' }]);
  }
}