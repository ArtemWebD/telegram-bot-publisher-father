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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
var controller_decorator_1 = require("../common/controller.decorator");
var TaskManager_1 = require("../task-manager/TaskManager");
var message_service_1 = require("./message.service");
var MessageController = /** @class */ (function () {
    function MessageController() {
        this.messageService = new message_service_1.MessageService();
        this.taskManager = TaskManager_1.TaskManager.getInstance();
    }
    MessageController.prototype.start = function (msg) {
        return this.messageService.start(msg);
    };
    MessageController.prototype.menu = function (msg) {
        return this.messageService.menu(msg);
    };
    __decorate([
        (0, controller_decorator_1.Controller)('/start'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "start", null);
    __decorate([
        (0, controller_decorator_1.Controller)('/menu'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MessageController.prototype, "menu", null);
    return MessageController;
}());
exports.MessageController = MessageController;
