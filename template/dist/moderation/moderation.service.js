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
exports.ModerationService = void 0;
var config_1 = __importDefault(require("config"));
var advertisement_entity_1 = require("../advertisement/entities/advertisement.entity");
var bot_decorator_1 = require("../bot/bot.decorator");
var Database_1 = __importDefault(require("../database/Database"));
var TaskManager_1 = require("../task-manager/TaskManager");
var moderation_consumer_1 = require("./moderation.consumer");
var chat_service_1 = require("../chat/chat.service");
var ModerationService = /** @class */ (function () {
    function ModerationService() {
        this.database = Database_1.default.getInstance();
        this.advertisementRepository = this.database.getRepository(advertisement_entity_1.AdvertisementEntity);
        this.taskManager = TaskManager_1.TaskManager.getInstance();
        this.chatService = new chat_service_1.ChatService();
    }
    ModerationService.prototype.send = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var advertisement, inline_keyboard, text, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.advertisementRepository.findOneBy({ id: id })];
                    case 1:
                        advertisement = _a.sent();
                        if (!advertisement) {
                            return [2 /*return*/];
                        }
                        inline_keyboard = [
                            advertisement.buttonText && advertisement.buttonUrl
                                ? [{ text: advertisement.buttonText, url: advertisement.buttonUrl }]
                                : [],
                            [
                                { text: 'Принять', callback_data: JSON.stringify({ type: 'accept', data: id }) },
                                { text: 'Отклонить', callback_data: JSON.stringify({ type: 'reject', data: id }) },
                            ],
                        ];
                        text = "".concat(advertisement.text, "\n\n") +
                            "\u0421\u043E\u0437\u0434\u0430\u043D\u043E: ".concat(new Date(advertisement.createdAt).toLocaleDateString(), "\n") +
                            "\u0421\u0442\u0430\u0442\u0443\u0441: ".concat(advertisement.status);
                        return [4 /*yield*/, this.bot.sendMessage(advertisement.userId, 'Ваше объявление отправлено на модерацию, я сообщу вам о результатах')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, advertisement.image
                                ? this.bot.sendPhoto(config_1.default.get('moderate'), Buffer.from(advertisement.image), {
                                    reply_markup: { inline_keyboard: inline_keyboard },
                                    caption: text,
                                })
                                : this.bot.sendMessage(config_1.default.get('moderate'), text, { reply_markup: { inline_keyboard: inline_keyboard } })];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ModerationService.prototype.accept = function (id, query) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var advertisement, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.advertisementRepository.findOne({ where: { id: id } })];
                    case 1:
                        advertisement = _b.sent();
                        if (!advertisement || !query.message) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bot.deleteMessage(query.message.chat.id, (_a = query.message) === null || _a === void 0 ? void 0 : _a.message_id.toString())];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.chatService.sendAdvertisement(advertisement)];
                    case 3:
                        _b.sent();
                        advertisement.status = advertisement_entity_1.AdvertisementStatus.accepted;
                        return [4 /*yield*/, this.advertisementRepository.save(advertisement)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, this.bot.sendMessage(advertisement.userId, 'Ваше объявление было принято!')];
                    case 5:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ModerationService.prototype.reject = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var advertisement_1, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.advertisementRepository.findOne({ where: { id: id } })];
                    case 1:
                        advertisement_1 = _a.sent();
                        if (!advertisement_1 || !query.message) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bot.deleteMessage(query.message.chat.id, query.message.message_id.toString())];
                    case 2:
                        _a.sent();
                        advertisement_1.status = advertisement_entity_1.AdvertisementStatus.rejected;
                        return [4 /*yield*/, this.advertisementRepository.save(advertisement_1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.bot.sendMessage(query.from.id, 'Напишите причину отказа, чтобы пропустить этот пункт введите /cancel')];
                    case 4:
                        _a.sent();
                        this.taskManager.addTask({
                            chatId: query.message.chat.id,
                            consumer: moderation_consumer_1.ModerationConsumer,
                            methods: [],
                            data: advertisement_1.userId,
                            cancel: '/cancel',
                            cancelCallback: function () {
                                _this.bot.sendMessage(advertisement_1.userId, 'Ваше объявление было отклонено');
                            },
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ModerationService = __decorate([
        bot_decorator_1.TgBot
    ], ModerationService);
    return ModerationService;
}());
exports.ModerationService = ModerationService;
