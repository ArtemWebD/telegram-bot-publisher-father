import { CallbackQuery, Message } from 'node-telegram-bot-api';
import Bot from '../bot/Bot';

export enum ControllerType {
  message = 'message',
  callbackQuery = 'callbackQuery',
}

export const Controller = (command: string, type = ControllerType.message) => {
  const instance = Bot.getInstance();
  const bot = instance.getBot;

  const messageHandler = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: Message[]) {
      bot.on('message', (message: Message) => {
        const text = message.text || message.caption;
        if (text === command) {
          originalMethod.call(this, message);
        }
      });
    };
  };

  const callbackQueryHandler = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      bot.on('callback_query', (query: CallbackQuery) => {
        if (query.data) {
          const { type, data } = JSON.parse(query.data);
          if (type === command) {
            originalMethod.call(this, data, query);
          }
        }
      });
    };
  };

  switch (type) {
    case ControllerType.message:
      return messageHandler;
    case ControllerType.callbackQuery:
      return callbackQueryHandler;
    default:
      throw new Error('This controller type was not found');
  }
};
