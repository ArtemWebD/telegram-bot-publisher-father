"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var Database_1 = __importDefault(require("../database/Database"));
var Module = function (Controller) {
    var database = Database_1.default.getInstance();
    database.isInited() ? null : database.init();
    return function (target) {
        var controller = new Controller();
        var methods = Object.getOwnPropertyNames(controller.__proto__);
        Object.keys(Controller.prototype).forEach(function (value) {
            if (Controller.prototype[value] instanceof Function) {
                controller[value]();
            }
        });
        return target;
    };
};
exports.Module = Module;
