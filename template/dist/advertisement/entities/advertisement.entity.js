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
exports.AdvertisementEntity = exports.AdvertisementStatus = void 0;
var typeorm_1 = require("typeorm");
var AdvertisementStatus;
(function (AdvertisementStatus) {
    AdvertisementStatus["moderate"] = "\u0412 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438";
    AdvertisementStatus["accepted"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u043E";
    AdvertisementStatus["rejected"] = "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E";
    AdvertisementStatus["development"] = "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F";
    AdvertisementStatus["ready"] = "\u0413\u043E\u0442\u043E\u0432\u043E";
})(AdvertisementStatus = exports.AdvertisementStatus || (exports.AdvertisementStatus = {}));
var AdvertisementEntity = /** @class */ (function () {
    function AdvertisementEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AdvertisementEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], AdvertisementEntity.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], AdvertisementEntity.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], AdvertisementEntity.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AdvertisementEntity.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.Column)({ array: true, type: 'varchar' }),
        __metadata("design:type", Array)
    ], AdvertisementEntity.prototype, "chatId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], AdvertisementEntity.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
        __metadata("design:type", Object)
    ], AdvertisementEntity.prototype, "buttonText", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
        __metadata("design:type", Object)
    ], AdvertisementEntity.prototype, "buttonUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', array: true, nullable: true }),
        __metadata("design:type", Object)
    ], AdvertisementEntity.prototype, "image", void 0);
    AdvertisementEntity = __decorate([
        (0, typeorm_1.Entity)('advertisement')
    ], AdvertisementEntity);
    return AdvertisementEntity;
}());
exports.AdvertisementEntity = AdvertisementEntity;
