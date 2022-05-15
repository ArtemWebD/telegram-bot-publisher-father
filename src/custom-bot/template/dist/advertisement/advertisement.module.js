"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementModule = void 0;
var module_decorator_1 = require("../common/module.decorator");
var advertisement_controller_1 = require("./advertisement.controller");
var AdvertisementModule = /** @class */ (function () {
    function AdvertisementModule() {
    }
    AdvertisementModule = __decorate([
        (0, module_decorator_1.Module)(advertisement_controller_1.AdvertisementController)
    ], AdvertisementModule);
    return AdvertisementModule;
}());
exports.AdvertisementModule = AdvertisementModule;
