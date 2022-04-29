import { Message } from 'node-telegram-bot-api';
import { Controller } from '../common/controller.decorator';
import { TaskManager } from '../task-manager/TaskManager';
import { MessageService } from './message.service';

export class MessageController {
  private readonly messageService = new MessageService();
  private readonly taskManager = TaskManager.getInstance();

  @Controller('/start')
  public start(msg: Message): Promise<Message> {
    return this.messageService.start(msg);
  }

  @Controller('/menu')
  public getMenu(msg: Message): Promise<Message> {
    return this.messageService.getMenu(msg);
  }
}
