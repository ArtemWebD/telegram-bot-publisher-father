import { CallbackQuery, Message } from "node-telegram-bot-api";
import { Controller, ControllerType } from "../common/controller.decorator";
import { CustomBotService } from "./custom-bot.service";

export class CustomBotController {
  private readonly customBotService = new CustomBotService();

  @Controller('addBot', ControllerType.callbackQuery)
  public add(data: undefined, query: CallbackQuery): Promise<Message> {
    return this.customBotService.addBot(query);
  }

  @Controller('bots', ControllerType.callbackQuery)
  public getBots(data: undefined, query: CallbackQuery): Promise<Message> {
    return this.customBotService.getBots(query);
  }

  @Controller('bot', ControllerType.callbackQuery)
  public getBot(id: number, query: CallbackQuery): Promise<Message> {
    return this.customBotService.getBot(id, query);
  }

  @Controller('deleteBot', ControllerType.callbackQuery)
  public deleteBot(id: number, query: CallbackQuery): Promise<Message> {
    return this.customBotService.deleteBot(id, query);
  }
}