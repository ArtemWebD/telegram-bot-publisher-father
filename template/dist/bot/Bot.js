"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
process.env['NODE_CONFIG_DIR'] = path_1.default.resolve(__dirname, '../../config/');
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var config_1 = __importDefault(require("config"));
var botSettings = config_1.default.get('Bot');
/**
   * The root class in which the bot is initialized.
   * Since it is implemented singleton, the instance must be obtained through a static method getInstance()
   */
var Bot = /** @class */ (function () {
    function Bot() {
        this._bot = new node_telegram_bot_api_1.default(botSettings.token, { polling: true });
    }
    Object.defineProperty(Bot.prototype, "getBot", {
        get: function () {
            return this._bot;
        },
        enumerable: false,
        configurable: true
    });
    Bot.getInstance = function () {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    };
    return Bot;
}());
exports.default = Bot;
