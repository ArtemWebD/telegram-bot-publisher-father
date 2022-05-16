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
exports.PostEditorService = void 0;
var advertisement_entity_1 = require("../advertisement/entities/advertisement.entity");
var bot_decorator_1 = require("../bot/bot.decorator");
var Database_1 = __importDefault(require("../database/Database"));
var TaskManager_1 = require("../task-manager/TaskManager");
var add_button_consumer_1 = require("./add-button.consumer");
var add_image_consumer_1 = require("./add-image.consumer");
var PostEditorService = /** @class */ (function () {
    function PostEditorService() {
        this.database = Database_1.default.getInstance();
        this.advertisementRepository = this.database.getRepository(advertisement_entity_1.AdvertisementEntity);
        this.taskManager = TaskManager_1.TaskManager.getInstance();
    }
    PostEditorService.prototype.getPost = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var advertisement, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.advertisementRepository.findOneBy({ id: id })];
                    case 1:
                        advertisement = _a.sent();
                        if (!advertisement) {
                            return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Объявление не найдено')];
                        }
                        return [2 /*return*/, this.sendOneReady(advertisement)];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostEditorService.prototype.sendOneReady = function (advertisement) {
        var userId = advertisement.userId, text = advertisement.text, image = advertisement.image;
        var keyboard = this.createInlineKeyboard(advertisement);
        return image
            ? this.bot.sendPhoto(userId, Buffer.from(image), {
                caption: text,
                reply_markup: { inline_keyboard: keyboard },
            })
            : this.bot.sendMessage(userId, text, {
                reply_markup: { inline_keyboard: keyboard },
            });
    };
    PostEditorService.prototype.addImage = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.taskManager.addTask({
                        chatId: query.from.id,
                        consumer: add_image_consumer_1.AddImageConsumer,
                        methods: [],
                        cancel: '/cancel',
                        cancelCallback: function (msg) {
                            _this.bot.sendMessage(msg.chat.id, 'Добавление картинки отменено');
                        },
                    });
                    return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Отправьте мне картинку, которую вы хотите прикрепить')];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        });
    };
    PostEditorService.prototype.deleteImage = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.advertisementRepository.update({ id: id }, { image: null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Картинка успешно удалена')];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostEditorService.prototype.addButton = function (query) {
        var _this = this;
        this.taskManager.addTask({
            chatId: query.from.id,
            methods: [],
            consumer: add_button_consumer_1.AddButtonConsumer,
            cancel: '/cancel',
            cancelCallback: function (msg) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.advertisementRepository.update({ id: (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id }, {
                                buttonText: null,
                                buttonUrl: null,
                            })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, this.bot.sendMessage(msg.chat.id, 'Создание кнопки отменено')];
                    }
                });
            }); },
        });
        return this.bot.sendMessage(query.from.id, 'Отправьте текст кнопки');
    };
    PostEditorService.prototype.deleteButton = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.advertisementRepository.update({ id: id }, { buttonText: null, buttonUrl: null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.bot.sendMessage(query.from.id, 'Кнопка успешно удалена')];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostEditorService.prototype.createInlineKeyboard = function (advertisement) {
        var buttonText = advertisement.buttonText, buttonUrl = advertisement.buttonUrl, image = advertisement.image, id = advertisement.id, status = advertisement.status;
        return [
            buttonText && buttonUrl ? [{ text: buttonText, url: buttonUrl }] : [],
            image
                ? [
                    {
                        text: 'Удалить картинку',
                        callback_data: JSON.stringify({ type: 'deleteImage', data: id }),
                    },
                ]
                : [
                    {
                        text: 'Добавить картинку',
                        callback_data: JSON.stringify({ type: 'addImage', data: id }),
                    },
                ],
            buttonText && buttonUrl
                ? [
                    {
                        text: 'Удалить кнопку',
                        callback_data: JSON.stringify({ type: 'deleteButton', data: id }),
                    },
                ]
                : [
                    {
                        text: 'Добавить кнопку со ссылкой',
                        callback_data: JSON.stringify({ type: 'addButton', data: id }),
                    },
                ],
            status === advertisement_entity_1.AdvertisementStatus.accepted
                ? [
                    {
                        text: 'Переопубликовать',
                        callback_data: JSON.stringify({ type: 'repost', data: id }),
                    },
                ]
                : [],
            status === advertisement_entity_1.AdvertisementStatus.ready
                ? [
                    {
                        text: 'Опубликовать',
                        callback_data: JSON.stringify({ type: 'sendModerate', data: id }),
                    },
                ]
                : [],
            [{ text: 'Удалить', callback_data: JSON.stringify({ type: 'postDelete', data: id }) }],
        ];
    };
    PostEditorService = __decorate([
        bot_decorator_1.TgBot
    ], PostEditorService);
    return PostEditorService;
}());
exports.PostEditorService = PostEditorService;
