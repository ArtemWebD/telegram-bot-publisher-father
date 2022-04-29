import Bot from "./Bot"

export const TgBot = (constructor: Function) => {
  const bot = Bot.getInstance();
  constructor.prototype.bot = bot.getBot;
}