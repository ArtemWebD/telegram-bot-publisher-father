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
exports.AdvertisementService = void 0;
var advertisement_consumer_1 = __importDefault(require("./advertisement.consumer"));
var advertisement_entity_1 = require("./entities/advertisement.entity");
var bot_decorator_1 = require("../bot/bot.decorator");
var Database_1 = __importDefault(require("../database/Database"));
var TaskManager_1 = require("../task-manager/TaskManager");
var chat_service_1 = require("../chat/chat.service");
var AdvertisementService = /** @class */ (function () {
    function AdvertisementService() {
        this.taskManager = new TaskManager_1.TaskManager();
        this.database = Database_1.default.getInstance();
        this.advertisementRepository = this.database.getRepository(advertisement_entity_1.AdvertisementEntity);
        this.chatService = new chat_service_1.ChatService();
    }
    AdvertisementService.prototype.createAdvertisement = function (data, query) {
        var _this = this;
        this.taskManager.addTask({
            chatId: query.from.id,
            consumer: advertisement_consumer_1.default,
            methods: [],
            cancel: '/cancel',
            cancelCallback: function (msg) {
                if (msg.from) {
                    _this.bot.sendMessage(msg.from.id, 'Создание объявления отменено', {
                        reply_markup: { remove_keyboard: true },
                    });
                }
            },
        });
        return this.bot.sendMessage(query.from.id, 'Введите текст своего объявления. Укажите информацию по своему товару/услуге, цену, свои контакты и иную необходимую информацию');
    };
    AdvertisementService.prototype.getPosts = function (data, query) {
        return __awaiter(this, void 0, void 0, function () {
            var posts, count, keyboard, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.advertisementRepository.find({
                                where: { userId: query.from.id },
                                take: 10,
                                skip: data || 0,
                                select: ['id', 'text'],
                            })];
                    case 1:
                        posts = _a.sent();
                        if (!posts.length) {
                            return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Вы пока не создали ни одного объявления')];
                        }
                        return [4 /*yield*/, this.advertisementRepository.countBy({ userId: query.from.id })];
                    case 2:
                        count = _a.sent();
                        keyboard = posts.map(function (post) {
                            return [
                                {
                                    text: post.text.slice(0, 15) + '...',
                                    callback_data: JSON.stringify({ type: 'post', data: post.id }),
                                },
                            ];
                        });
                        if (posts.length !== count) {
                            keyboard.push([
                                {
                                    text: 'Получить еще',
                                    callback_data: JSON.stringify({ type: 'posts', data: posts.length }),
                                },
                            ]);
                        }
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Ваши объявления', {
                                reply_markup: {
                                    inline_keyboard: keyboard,
                                },
                            })];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvertisementService.prototype.deletePost = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.advertisementRepository.delete({ id: id })];
                    case 1:
                        _a.sent();
                        if (!query.message) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bot.deleteMessage(query.from.id, query.message.message_id.toString())];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Пост успешно удален')];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdvertisementService.prototype.repost = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var advertisement, error_3;
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
                        if (advertisement.status !== advertisement_entity_1.AdvertisementStatus.accepted) {
                            return [2 /*return*/, this.bot.sendMessage(advertisement.userId, 'Ваша заявка должна быть принята, чтобы ее можно было переопубликовать')];
                        }
                        if (new Date(advertisement.updatedAt).toLocaleDateString() === new Date().toLocaleDateString()) {
                            return [2 /*return*/, this.bot.sendMessage(advertisement.userId, 'Переопубликовать объявления можно только 1 раз в день')];
                        }
                        return [4 /*yield*/, this.chatService.sendAdvertisement(advertisement)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Ваше объявление переопубликовано')];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvertisementService = __decorate([
        bot_decorator_1.TgBot
    ], AdvertisementService);
    return AdvertisementService;
}());
exports.AdvertisementService = AdvertisementService;
