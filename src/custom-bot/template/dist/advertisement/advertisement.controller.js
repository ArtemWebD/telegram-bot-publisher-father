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
exports.AdvertisementController = void 0;
var controller_decorator_1 = require("../common/controller.decorator");
var advertisement_service_1 = require("./advertisement.service");
var AdvertisementController = /** @class */ (function () {
    function AdvertisementController() {
        this.advertisementService = new advertisement_service_1.AdvertisementService();
    }
    AdvertisementController.prototype.advertisement = function (data, query) {
        return this.advertisementService.createAdvertisement(data, query);
    };
    AdvertisementController.prototype.posts = function (data, query) {
        return this.advertisementService.getPosts(data, query);
    };
    AdvertisementController.prototype.delete = function (data, query) {
        return this.advertisementService.deletePost(data, query);
    };
    AdvertisementController.prototype.repost = function (id, query) {
        return this.advertisementService.repost(id, query);
    };
    __decorate([
        (0, controller_decorator_1.Controller)('advertisement', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [void 0, Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementController.prototype, "advertisement", null);
    __decorate([
        (0, controller_decorator_1.Controller)('posts', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementController.prototype, "posts", null);
    __decorate([
        (0, controller_decorator_1.Controller)('postDelete', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementController.prototype, "delete", null);
    __decorate([
        (0, controller_decorator_1.Controller)('repost', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], AdvertisementController.prototype, "repost", null);
    return AdvertisementController;
}());
exports.AdvertisementController = AdvertisementController;
