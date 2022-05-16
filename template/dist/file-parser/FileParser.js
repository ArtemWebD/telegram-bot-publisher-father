"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var https_1 = __importDefault(require("https"));
var bot_decorator_1 = require("../bot/bot.decorator");
/**
 * The class allows you to process the received user files into an object containing a mimetype and buffer
 */
var FileParser = /** @class */ (function () {
    function FileParser() {
    }
    FileParser.prototype.parse = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (file instanceof Array) {
                        return [2 /*return*/, this.parsePhoto(file)];
                    }
                    return [2 /*return*/, this.parseFile(file)];
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    FileParser.prototype.parsePhoto = function (photoSize) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = photoSize[photoSize.length - 1].file_id;
                return [2 /*return*/, this.getFile(id, 'image/jpeg')];
            });
        });
    };
    FileParser.prototype.parseFile = function (file) {
        if (!file) {
            return undefined;
        }
        var id = file.file_id;
        //@ts-ignore
        return this.getFile(id, file.mime_type || 'application/octet-stream', file === null || file === void 0 ? void 0 : file.file_name);
    };
    FileParser.prototype.getFile = function (id, mimetype, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var file_path_1, token_1, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.bot.getFile(id)];
                    case 1:
                        file_path_1 = (_a.sent()).file_path;
                        token_1 = config_1.default.get('Bot').token;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                https_1.default.get("https://api.telegram.org/file/bot".concat(token_1, "/").concat(file_path_1), function (res) {
                                    var chunks = [];
                                    res.on('data', function (data) {
                                        chunks.push.apply(chunks, Array.from(data));
                                    });
                                    res.on('end', function () { return resolve(Buffer.from(chunks)); });
                                    res.on('error', function (err) { return reject(err); });
                                });
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, { mimetype: mimetype, data: data, filename: filename }];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileParser = __decorate([
        bot_decorator_1.TgBot
    ], FileParser);
    return FileParser;
}());
exports.default = FileParser;
