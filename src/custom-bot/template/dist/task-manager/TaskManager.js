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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
var bot_decorator_1 = require("../bot/bot.decorator");
var consumer_decorator_1 = require("./consumer.decorator");
/**
 * The class is responsible for managing tasks.
 * Tasks are linked to a specific chat via chatId and are executed without getting into the listener.
 * The task consists of the chat id and the consumer. Consumers are ordinary classes.
 * Methods decorated by the decorator @Consumer participate in the task.
 * Task Manager must be global, so it is implemented via singleton. You can create an instance using the static getInstance() method.
 * Custom task managers can be implemented via TaskManagerFactory
 */
var TaskManager = /** @class */ (function () {
    function TaskManager() {
    }
    TaskManager_1 = TaskManager;
    TaskManager.getInstance = function () {
        if (!TaskManager_1.instance) {
            TaskManager_1.instance = new TaskManager_1();
        }
        return TaskManager_1.instance;
    };
    TaskManager.prototype.init = function () {
        var _this = this;
        this.bot.on('message', function (msg) {
            if (!msg.from) {
                return false;
            }
            var isExist = _this.checkTask(msg.from.id);
            if (isExist) {
                _this.complete(msg);
            }
        });
    };
    TaskManager.prototype.addTask = function (task) {
        TaskManager_1.tasks.push(task);
    };
    TaskManager.prototype.checkTask = function (chatId) {
        return !!TaskManager_1.tasks.find(function (value) { return value.chatId === chatId; });
    };
    TaskManager.prototype.complete = function (msg) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var task, text, consumer, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        task = TaskManager_1.tasks.find(function (task) { return task.chatId === msg.chat.id; });
                        if (!task || !msg.from) {
                            return [2 /*return*/];
                        }
                        text = msg.text || msg.caption;
                        if (this.cancelHandler(msg, task)) {
                            return [2 /*return*/];
                        }
                        consumer = new task.consumer();
                        return [4 /*yield*/, consumer[task.methods[0]](msg)];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            this.bot.sendMessage((_a = msg.from) === null || _a === void 0 ? void 0 : _a.id, 'Произошла какая-то ошибка, попробуйте снова отправить сообщение');
                            return [2 /*return*/];
                        }
                        task.methods.shift();
                        if (!task.methods.length) {
                            TaskManager_1.tasks = TaskManager_1.tasks.filter(function (value) { return value.chatId !== task.chatId; });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.prototype.cancelHandler = function (msg, task) {
        if (!task || !msg.from) {
            return false;
        }
        var text = msg.text || msg.caption;
        if (task.cancel && task.cancel === text) {
            this.deleteTask(msg.from.id);
            if (task.cancelCallback) {
                task.cancelCallback(msg);
            }
            return true;
        }
        return false;
    };
    TaskManager.prototype.deleteTask = function (chatId) {
        TaskManager_1.tasks = TaskManager_1.tasks.filter(function (task) { return task.chatId !== chatId; });
    };
    TaskManager.prototype.getData = function (chatId) {
        var task = TaskManager_1.tasks.find(function (value) { return value.chatId === chatId; });
        if (!task) {
            return null;
        }
        return task.data;
    };
    var TaskManager_1;
    TaskManager.tasks = [];
    __decorate([
        consumer_decorator_1.GetConsumers,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TaskManager.prototype, "addTask", null);
    TaskManager = TaskManager_1 = __decorate([
        bot_decorator_1.TgBot
    ], TaskManager);
    return TaskManager;
}());
exports.TaskManager = TaskManager;
