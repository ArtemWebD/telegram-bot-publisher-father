"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var bot_decorator_1 = require("../bot/bot.decorator");
var Database_1 = __importDefault(require("../database/Database"));
var consumer_decorator_1 = require("../task-manager/consumer.decorator");
var advertisement_entity_1 = require("./entities/advertisement.entity");
var moderation_service_1 = require("../moderation/moderation.service");
var chat_service_1 = require("../chat/chat.service");
var post_editor_service_1 = require("../post-editor/post-editor.service");
var AdvertisementConsumer = /** @class */ (function () {
    function AdvertisementConsumer() {
        this.database = Database_1.default.getInstance();
        this.advertisementRepository = this.database.getRepository(advertisement_entity_1.AdvertisementEntity);
        this.moderationService = new moderation_service_1.ModerationService();
        this.chatService = new chat_service_1.ChatService();
        this.postEditorService = new post_editor_service_1.PostEditorService();
    }
    AdvertisementConsumer.prototype.setText = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, text, caption, userText, chats, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = this.getMessageFields(msg), from = _a.from, text = _a.text, caption = _a.caption;
                        userText = text || caption;
                        return [4 /*yield*/, this.advertisementRepository.delete({
                                userId: from.id,
                                status: advertisement_entity_1.AdvertisementStatus.development,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.advertisementRepository.save({
                                userId: from.id,
                                text: userText,
                                status: advertisement_entity_1.AdvertisementStatus.development,
                                chatId: [],
                                botId: 0,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.chatService.getAllChatsByUserId(from.id)];
                    case 3:
                        chats = _b.sent();
                        return [4 /*yield*/, this.bot.sendMessage(from.id, 'Теперь перешлите сообщение из чата, в который будет вестись рассылка, ' +
                                'и назначьте этого бота администратором. Если вы еще не добавили ни одного чата, перешлите сообщение из желаемого чата', {
                                reply_markup: {
                                    keyboard: chats.map(function (chat) { return [{ text: chat.title }]; }),
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdvertisementConsumer.prototype.setChat = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, text, caption, chatTitle, chat, advertisement, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = this.getMessageFields(msg), from = _a.from, text = _a.text, caption = _a.caption;
                        chatTitle = text || caption;
                        if (!chatTitle) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.getChat(chatTitle, msg)];
                    case 1:
                        chat = _b.sent();
                        if (!chat) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.getAdvertisement(from.id)];
                    case 2:
                        advertisement = _b.sent();
                        advertisement.chatId = [chat.chatId.toString()];
                        advertisement.status = advertisement_entity_1.AdvertisementStatus.ready;
                        return [4 /*yield*/, this.advertisementRepository.save(advertisement)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.bot.sendMessage(from.id, 'Ваше объявление готово к публикации, добавьте к нему больше элементов по желанию', {
                                reply_markup: { remove_keyboard: true },
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.postEditorService.sendOneReady(advertisement)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // @Consumer
    // public async send(msg: Message) {
    //   try {
    //     const { text, caption, from } = this.getMessageFields(msg);
    //     const command = text || caption;
    //     if (!command || command !== 'Опубликовать') {
    //       return false;
    //     }
    //     const advertisement = await this.getAdvertisement(from.id);
    //     advertisement.status = AdvertisementStatus.moderate;
    //     await this.advertisementRepository.save(advertisement);
    //     await this.moderationService.send(advertisement.id);
    //     await this.bot.sendMessage(
    //       from.id,
    //       'Ваше объявление отправлено на модерацию, я сообщу о результатах!',
    //       {
    //         reply_markup: {
    //           remove_keyboard: true,
    //         },
    //       },
    //     );
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // }
    AdvertisementConsumer.prototype.getAdvertisement = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var advertisement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.advertisementRepository.findOneBy({
                            userId: userId,
                            status: advertisement_entity_1.AdvertisementStatus.development,
                        })];
                    case 1:
                        advertisement = _a.sent();
                        if (!advertisement) {
                            throw new Error();
                        }
                        return [2 /*return*/, advertisement];
                }
            });
        });
    };
    AdvertisementConsumer.prototype.getMessageFields = function (msg) {
        var text = msg.text, caption = msg.caption, from = msg.from;
        if (!from || (!text && !caption)) {
            throw new Error();
        }
        return { text: text, caption: caption, from: from };
    };
    AdvertisementConsumer.prototype.getChat = function (text, msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!msg.from) {
                    return [2 /*return*/, null];
                }
                if (msg.forward_from_chat) {
                    return [2 /*return*/, this.chatService.addChatByMessage(msg)];
                }
                return [2 /*return*/, this.chatService.getChatByTitle(msg.from.id, text)];
            });
        });
    };
    __decorate([
        consumer_decorator_1.Consumer,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementConsumer.prototype, "setText", null);
    __decorate([
        consumer_decorator_1.Consumer,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementConsumer.prototype, "setChat", null);
    AdvertisementConsumer = __decorate([
        bot_decorator_1.TgBot
    ], AdvertisementConsumer);
    return AdvertisementConsumer;
}());
exports.default = AdvertisementConsumer;
