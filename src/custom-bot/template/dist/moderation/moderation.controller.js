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
exports.ModerationController = void 0;
var bot_decorator_1 = require("../bot/bot.decorator");
var controller_decorator_1 = require("../common/controller.decorator");
var moderation_service_1 = require("./moderation.service");
var ModerationController = /** @class */ (function () {
    function ModerationController() {
        this.moderationService = new moderation_service_1.ModerationService();
    }
    ModerationController.prototype.moderate = function (id) {
        return this.moderationService.send(id);
    };
    ModerationController.prototype.accept = function (id, query) {
        return this.moderationService.accept(id, query);
    };
    ModerationController.prototype.reject = function (id, query) {
        return this.moderationService.reject(id, query);
    };
    __decorate([
        (0, controller_decorator_1.Controller)('sendModerate', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], ModerationController.prototype, "moderate", null);
    __decorate([
        (0, controller_decorator_1.Controller)('accept', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], ModerationController.prototype, "accept", null);
    __decorate([
        (0, controller_decorator_1.Controller)('reject', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], ModerationController.prototype, "reject", null);
    ModerationController = __decorate([
        bot_decorator_1.TgBot
    ], ModerationController);
    return ModerationController;
}());
exports.ModerationController = ModerationController;
