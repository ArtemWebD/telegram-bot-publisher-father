"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConsumers = exports.Consumer = void 0;
var consumers = [];
var Consumer = function (target, propertyKey) {
    var consumer = consumers.find(function (value) { return value.constructor === target.constructor.name; });
    if (!consumer) {
        consumers.push({
            constructor: target.constructor.name,
            methods: [propertyKey],
        });
    }
    else {
        consumer.methods.push(propertyKey);
    }
};
exports.Consumer = Consumer;
function GetConsumers(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var task = args[0];
        var consumer = consumers.find(function (consumer) { return consumer.constructor === task.consumer.name; });
        task.methods = (consumer === null || consumer === void 0 ? void 0 : consumer.methods.concat()) || [];
        var result = originalMethod.apply(this, args);
        return result;
    };
    return descriptor;
}
exports.GetConsumers = GetConsumers;
