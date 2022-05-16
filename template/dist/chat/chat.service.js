"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
var bot_decorator_1 = require("../bot/bot.decorator");
var advertisement_entity_1 = require("../advertisement/entities/advertisement.entity");
var Database_1 = __importDefault(require("../database/Database"));
var TaskManager_1 = require("../task-manager/TaskManager");
var chat_consumer_1 = require("./chat.consumer");
var chat_entity_1 = require("./entities/chat.entity");
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.database = Database_1.default.getInstance();
        this.advertisementRepository = this.database.getRepository(advertisement_entity_1.AdvertisementEntity);
        this.chatRepository = this.database.getRepository(chat_entity_1.ChatEntity);
        this.taskManager = TaskManager_1.TaskManager.getInstance();
    }
    ChatService.prototype.sendAdvertisement = function (advertisement) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, chatId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _i = 0, _a = advertisement.chatId;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        chatId = _a[_i];
                        return [4 /*yield*/, this.buildMessage(advertisement, chatId)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        advertisement.updatedAt = new Date();
                        return [4 /*yield*/, this.advertisementRepository.save(advertisement)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.addChat = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.taskManager.addTask({
                        chatId: query.from.id,
                        consumer: chat_consumer_1.ChatConsumer,
                        methods: [],
                    });
                    return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Перешлите сообщение из чата, который вы хотите добавить')];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        });
    };
    ChatService.prototype.getAllChats = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var chats, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.chatRepository.findBy({ userId: query.from.id })];
                    case 1:
                        chats = _a.sent();
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Добавленные чаты', {
                                reply_markup: {
                                    inline_keyboard: chats.map(function (chat) {
                                        return [
                                            { text: chat.title, callback_data: JSON.stringify({ type: 'chat', data: chat.id }) },
                                        ];
                                    }),
                                },
                            })];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.getChat = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var chat, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.chatRepository.findOneBy({ id: id })];
                    case 1:
                        chat = _a.sent();
                        if (!chat) {
                            throw new Error();
                        }
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, chat.title, {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: 'Удалить', callback_data: JSON.stringify({ type: 'deleteChat', data: id }) }],
                                    ],
                                },
                            })];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.deleteChat = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!query.message) {
                            throw new Error();
                        }
                        return [4 /*yield*/, this.chatRepository.delete({ id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bot.deleteMessage(query.from.id, query.message.message_id.toString())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Чат успешно удален')];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.addChatByMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (!msg.forward_from_chat || !msg.from) {
                        throw new Error();
                    }
                    return [2 /*return*/, this.chatRepository.save({
                            chatId: msg.forward_from_chat.id.toString(),
                            userId: msg.from.id,
                            title: msg.forward_from_chat.title,
                        })];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        });
    };
    ChatService.prototype.getAllChatsByUserId = function (userId) {
        return this.chatRepository.findBy({ userId: userId });
    };
    ChatService.prototype.getChatByTitle = function (userId, title) {
        return this.chatRepository.findOneBy({ userId: userId, title: title });
    };
    ChatService.prototype.buildMessage = function (advertisement, chatId) {
        var image = advertisement.image, buttonText = advertisement.buttonText, buttonUrl = advertisement.buttonUrl, text = advertisement.text;
        var inline_keyboard = [
            (buttonText && buttonUrl) ? [{ text: buttonText, url: buttonUrl }] : [],
        ];
        return image
            ? this.bot.sendPhoto(chatId, Buffer.from(image), {
                caption: text,
                reply_markup: { inline_keyboard: inline_keyboard },
            })
            : this.bot.sendMessage(chatId, text, {
                reply_markup: { inline_keyboard: inline_keyboard },
            });
    };
    ChatService = __decorate([
        bot_decorator_1.TgBot
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
