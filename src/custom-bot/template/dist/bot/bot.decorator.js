"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TgBot = void 0;
var Bot_1 = __importDefault(require("./Bot"));
var TgBot = function (constructor) {
    var bot = Bot_1.default.getInstance();
    constructor.prototype.bot = bot.getBot;
};
exports.TgBot = TgBot;
