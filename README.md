<h1 style='text-align: center'>Typescript Telegram Bot</h1>

<div style='text-align: center'><img src='logo.png' style='max-width: 200px;'></div>

---

## Description

Wrapper on top of the well-known node js library for convenient creation of bots in Typescript using classes, decorators, etc.

[**To work with this template, you should familiarize yourself with the node-telegram-bot-api**](https://github.com/yagop/node-telegram-bot-api)

---
## About the project

### Technologies

* Typescript
* Node-telegram-bot-api
* Node-config
* PostgreSQL _**(in development)**_
* Sequelize _**(in development)**_

### Config

The configs store data for the bot, for example, the bot token, chats, etc. The config file has the path *./config/default.json*

[**For effective work, it is recommended to familiarize yourself with the node-config library**](https://github.com/node-config/node-config#readme)

### Initialization
To initialize the bot, you need a token that you can get from [@BotFather](https://t.me/BotFather).
The received token must be entered in the appropriate field in the config. After that, you can run the bot by pre-compiling _**.ts**_ files.
```
npm run watch
npm run start
```

The bot is initialized in the Bot class.
```ts
class Bot {
  private readonly bot = new TelegramBot(botSettings.token, { polling: true });
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
```
