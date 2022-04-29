import TelegramBot, { Message } from 'node-telegram-bot-api';
import { TgBot } from '../bot/bot.decorator';
import { GetConsumers } from './consumer.decorator';
import { TaskManagerFactory, TaskProps } from './TaskManagerFactory';

/**
 * The class is responsible for managing tasks.
 * Tasks are linked to a specific chat via chatId and are executed without getting into the listener.
 * The task consists of the chat id and the consumer. Consumers are ordinary classes.
 * Methods decorated by the decorator @Consumer participate in the task.
 * Task Manager must be global, so it is implemented via singleton. You can create an instance using the static getInstance() method.
 * Custom task managers can be implemented via TaskManagerFactory
 */
@TgBot
export class TaskManager implements TaskManagerFactory {
  private readonly bot: TelegramBot;
  private static instance: TaskManager;
  private static tasks: TaskProps[] = [];

  public static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  public init(): void {
    this.bot.on('message', (msg: Message) => {
      if (!msg.from) {
        return false;
      }
      const isExist = this.checkTask(msg.from.id);
      if (isExist) {
        this.complete(msg);
      }
    });
  }

  @GetConsumers
  public addTask(task: TaskProps): void {
    TaskManager.tasks.push(task);
  }

  public checkTask(chatId: number): boolean {
    return !!TaskManager.tasks.find((value) => value.chatId === chatId);
  }

  private async complete(msg: TelegramBot.Message): Promise<void> {
    const task = TaskManager.tasks.find((task) => task.chatId === msg.chat.id);
    if (!task || !msg.from) {
      return;
    }
    const text = msg.text || msg.caption;
    if (this.cancelHandler(msg, task)) {
      return;
    }
    const consumer = new task.consumer();
    const result = await consumer[task.methods[0]](msg);
    if (!result) {
      this.bot.sendMessage(
        msg.from?.id,
        'Произошла какая-то ошибка, попробуйте снова отправить сообщение',
      );
      return;
    }
    task.methods.shift();
    if (!task.methods.length) {
      TaskManager.tasks = TaskManager.tasks.filter((value) => value.chatId !== task.chatId);
    }
  }

  private cancelHandler(msg: Message, task: TaskProps): boolean {
    if (!task || !msg.from) {
      return false;
    }
    const text = msg.text || msg.caption;
    if (task.cancel && task.cancel === text) {
      this.deleteTask(msg.from.id);
      if (task.cancelCallback) {
        task.cancelCallback(msg);
      }
      return true;
    }
    return false;
  }

  public deleteTask(chatId: number): void {
    TaskManager.tasks = TaskManager.tasks.filter((task) => task.chatId !== chatId);
  }

  public getData(chatId: number): any {
    const task = TaskManager.tasks.find((value) => value.chatId === chatId);
    if (!task) {
      return null;
    }
    return task.data;
  }
}
