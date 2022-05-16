import TelegramBot, { Message } from "node-telegram-bot-api";
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';
import { exec } from 'child_process';
import { Repository } from "typeorm";
import { TgBot } from "../bot/bot.decorator";
import Database from "../database/Database";
import { Consumer } from "../task-manager/consumer.decorator";
import { BotActive, CustomBotEntity } from "./entities/custom-bot.entity";
import { CustomBotService } from "./custom-bot.service";

@TgBot
export class CustomBotConsumer {
  private readonly bot: TelegramBot;
  private readonly database = Database.getInstance();
  private readonly customBotRepository: Repository<CustomBotEntity> = this.database.getRepository(CustomBotEntity);
  private readonly customBotService = new CustomBotService();

  @Consumer
  public async getBot(msg: Message) {
    try {
      const token = msg.text || msg.caption;
      if (!msg.from || !token) {
        return false
      }
      await this.bot.sendMessage(msg.from.id, 'Сейчас я подготовлю вашего бота, это может занять какое-то время');
      const name = await this.copySource(token);
      await this.build(name);
      await this.customBotService.start(name);
      await this.deleteUserDir(name);
      const bot = await this.customBotService.getFirstname(token);
      await this.customBotRepository.save({
        name,
        userId: msg.from.id,
        token,
        active: BotActive.on,
        firstname: bot.first_name,
      });
      await this.bot.sendMessage(msg.from.id, 'Ваш бот успешно создан, через несколько секунд он может приступать к работе');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async copySource(token: string): Promise<string> {
    try {
      const name = uuid.v4();
      const sourcePath = path.resolve(__dirname, '../../template');
      const userSourcePath = path.resolve(__dirname, `bots/${name}`);
      await fs.cp(sourcePath, userSourcePath, { recursive: true });
      const configPath = path.resolve(__dirname, `bots/${name}/config/default.json`)
      const config = JSON.parse(
        await fs.readFile(configPath, 'utf8'),
      );
      config['Bot']['token'] =  token;
      await fs.writeFile(configPath, JSON.stringify(config));
      return name;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private build(name: string): Promise<void> {
    try {
      return new Promise<void>((resolve, reject) => {
        exec(
          `docker build -t ${name} ${path.resolve(__dirname, `bots/${name}`)}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(error);
            }
            resolve();
          },
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private deleteUserDir(name: string): Promise<void> {
    return fs.rm(path.join(__dirname, `bots/${name}`), { recursive: true });
  }
}