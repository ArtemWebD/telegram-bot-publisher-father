import path from "path";
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../../config/');
import TelegramBot from 'node-telegram-bot-api';
import config from "config";

interface BotSettings {
  token: string;
}

const botSettings: BotSettings = config.get('Bot');
/**
   * The root class in which the bot is initialized.
   * Since it is implemented singleton, the instance must be obtained through a static method getInstance()
   */
export default class Bot {
  private readonly _bot = new TelegramBot(botSettings.token, { polling: true });
  private static instance: Bot;

  public get getBot(): TelegramBot {
    return this._bot;
  }

  public static getInstance(): Bot {
    if (!Bot.instance) {
      Bot.instance = new Bot();
    }
    return Bot.instance
  }
}