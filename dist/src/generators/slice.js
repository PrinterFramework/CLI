"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.generateSlice = void 0;
var prompts_1 = __importDefault(require("prompts"));
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
function generateSlice(name) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var slicePath, reducerPath, reducersPath, reducers, result, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    slicePath = (0, path_1.join)(process.cwd(), 'redux', 'slice', "".concat(name, ".tsx"));
                    reducerPath = (0, path_1.join)(process.cwd(), 'redux', 'reducer.tsx');
                    reducersPath = (0, path_1.join)(process.cwd(), 'redux', 'reducers.json');
                    reducers = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    reducers = JSON.parse((0, fs_jetpack_1.read)(reducersPath));
                    if (!(reducers.indexOf(name) !== -1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: 'confirm',
                            name: 'overwrite',
                            message: 'This slice already exists, overwrite it?'
                        })];
                case 2:
                    result = _c.sent();
                    if (result.overwrite === false) {
                        return [2 /*return*/];
                    }
                    _c.label = 3;
                case 3:
                    if (reducers.indexOf(name) === -1) {
                        reducers.push(name);
                    }
                    (0, fs_jetpack_1.write)(reducersPath, JSON.stringify(reducers, null, 2));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    (0, log_1.Log)('    ❗  redux/reducers.json is invalid, please make sure it\'s a JSON Array'.red);
                    process.exit();
                    return [3 /*break*/, 5];
                case 5:
                    (0, fs_jetpack_1.write)(slicePath, ((_a = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'slice', 'slice.template'))) === null || _a === void 0 ? void 0 : _a.replaceAll('{{name}}', name)) || '');
                    (0, log_1.Log)("    \u2705  Created redux/slice/".concat(name, ".tsx").green);
                    (0, fs_jetpack_1.write)(reducerPath, ((_b = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'slice', 'reducer.template'))) === null || _b === void 0 ? void 0 : _b.replaceAll('{{import}}', reducers.map(function (slice) { return "import { ".concat(slice, "Slice } from 'redux/slice/").concat(slice, "'"); }).join('\n')).replaceAll('{{reducer}}', reducers.map(function (slice) { return "  ".concat(slice, ": ").concat(slice, "Slice.reducer,"); }).join('\n'))) || '');
                    (0, log_1.Log)('    ✅  Updated redux/reducer.tsx'.green);
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateSlice = generateSlice;
//# sourceMappingURL=slice.js.map