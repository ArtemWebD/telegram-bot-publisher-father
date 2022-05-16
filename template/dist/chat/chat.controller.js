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
exports.ChatController = void 0;
var controller_decorator_1 = require("../common/controller.decorator");
var chat_service_1 = require("./chat.service");
var ChatController = /** @class */ (function () {
    function ChatController() {
        this.chatService = new chat_service_1.ChatService();
    }
    ChatController.prototype.add = function (data, query) {
        return this.chatService.addChat(query);
    };
    ChatController.prototype.get = function (data, query) {
        return this.chatService.getAllChats(query);
    };
    ChatController.prototype.getChat = function (id, query) {
        return this.chatService.getChat(id, query);
    };
    ChatController.prototype.deleteChat = function (id, query) {
        return this.chatService.deleteChat(id, query);
    };
    __decorate([
        (0, controller_decorator_1.Controller)('addChat', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [void 0, Object]),
        __metadata("design:returntype", Promise)
    ], ChatController.prototype, "add", null);
    __decorate([
        (0, controller_decorator_1.Controller)('getChats', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [void 0, Object]),
        __metadata("design:returntype", Promise)
    ], ChatController.prototype, "get", null);
    __decorate([
        (0, controller_decorator_1.Controller)('chat', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], ChatController.prototype, "getChat", null);
    __decorate([
        (0, controller_decorator_1.Controller)('deleteChat', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], ChatController.prototype, "deleteChat", null);
    return ChatController;
}());
exports.ChatController = ChatController;
