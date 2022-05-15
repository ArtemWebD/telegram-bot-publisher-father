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
exports.PostEditorController = void 0;
var controller_decorator_1 = require("../common/controller.decorator");
var post_editor_service_1 = require("./post-editor.service");
var PostEditorController = /** @class */ (function () {
    function PostEditorController() {
        this.postEditorService = new post_editor_service_1.PostEditorService();
    }
    PostEditorController.prototype.getPost = function (id, query) {
        return this.postEditorService.getPost(id, query);
    };
    PostEditorController.prototype.addImage = function (id, query) {
        return this.postEditorService.addImage(query);
    };
    PostEditorController.prototype.deleteImage = function (id, query) {
        return this.postEditorService.deleteImage(id, query);
    };
    PostEditorController.prototype.addButton = function (id, query) {
        return this.postEditorService.addButton(query);
    };
    PostEditorController.prototype.deleteButton = function (id, query) {
        return this.postEditorService.deleteButton(id, query);
    };
    __decorate([
        (0, controller_decorator_1.Controller)('post', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], PostEditorController.prototype, "getPost", null);
    __decorate([
        (0, controller_decorator_1.Controller)('addImage', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], PostEditorController.prototype, "addImage", null);
    __decorate([
        (0, controller_decorator_1.Controller)('deleteImage', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], PostEditorController.prototype, "deleteImage", null);
    __decorate([
        (0, controller_decorator_1.Controller)('addButton', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], PostEditorController.prototype, "addButton", null);
    __decorate([
        (0, controller_decorator_1.Controller)('deleteButton', controller_decorator_1.ControllerType.callbackQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], PostEditorController.prototype, "deleteButton", null);
    return PostEditorController;
}());
exports.PostEditorController = PostEditorController;
