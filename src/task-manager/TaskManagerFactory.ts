import TelegramBot, { Message } from 'node-telegram-bot-api';

export interface Class extends Function {
  new (): any;
}

export interface Task {
  chatId: number;
  consumer: Class;
  data?: any;
  cancel?: string;
  cancelCallback?: (msg: Message) => any;
}

export interface TaskProps extends Task {
  methods: string[];
}

export interface TaskManagerFactory {
  addTask(task: Task): void;

  checkTask(chatId: number): boolean;

  deleteTask(chatId: number): void;

  getData(chatId: number): any;
}
