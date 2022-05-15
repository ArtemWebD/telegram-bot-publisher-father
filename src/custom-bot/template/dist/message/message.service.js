"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var bot_decorator_1 = require("../bot/bot.decorator");
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.startKeyboard = {
            inline_keyboard: [
                [
                    { text: 'Создать объявление', callback_data: JSON.stringify({ type: 'advertisement' }) },
                    { text: 'Мои публикации', callback_data: JSON.stringify({ type: 'posts' }) },
                ],
                [
                    { text: 'Добавить чат', callback_data: JSON.stringify({ type: 'addChat' }) },
                    { text: 'Чаты', callback_data: JSON.stringify({ type: 'getChats' }) },
                ],
            ],
        };
    }
    MessageService.prototype.start = function (msg) {
        var chat = msg.chat, from = msg.from;
        return this.bot.sendMessage(chat.id, "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, ".concat(from === null || from === void 0 ? void 0 : from.first_name, "! \u0412\u044B\u0431\u0435\u0440\u0438 \u0442\u043E, \u0447\u0442\u043E \u0442\u0435\u0431\u0435 \u043D\u0443\u0436\u043D\u043E\uD83D\uDC47"), {
            reply_markup: this.startKeyboard,
        });
    };
    MessageService.prototype.menu = function (msg) {
        var chat = msg.chat, from = msg.from;
        return this.bot.sendMessage(chat.id, 'Вот что я могу', {
            reply_markup: this.startKeyboard,
        });
    };
    MessageService = __decorate([
        bot_decorator_1.TgBot
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
