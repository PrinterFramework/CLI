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
exports.generateComponent = void 0;
var prompts_1 = __importDefault(require("prompts"));
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var config_1 = require("../config");
function generateComponent(path) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function () {
        var result, pathArray, fileName, name, component, componentPath, style, stylePath, test_1, testPath, index, indexPath, component, componentPath;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    if (!((0, fs_jetpack_1.exists)((0, path_1.join)(process.cwd(), path)) || (0, fs_jetpack_1.exists)((0, path_1.join)(process.cwd(), "".concat(path, ".tsx"))))) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: 'confirm',
                            name: 'overwrite',
                            message: 'This component already exists, overwrite it?'
                        })];
                case 1:
                    result = _l.sent();
                    if (result.overwrite === false) {
                        return [2 /*return*/];
                    }
                    _l.label = 2;
                case 2:
                    pathArray = path.split('/');
                    fileName = pathArray[pathArray.length - 1];
                    name = fileName.replace(/[^\w\s]/gi, '');
                    if (fileName.indexOf('.') !== -1) {
                        name = fileName.split('.').map(function (word) { return word[0].toUpperCase() + word.substring(1); }).join('');
                    }
                    else if (fileName.indexOf('-') !== -1) {
                        name = fileName.split('-').map(function (word) { return word[0].toUpperCase() + word.substring(1); }).join('');
                    }
                    else {
                        name = name[0].toUpperCase() + name.substring(1);
                    }
                    if (config_1.Config.componentFolder === true) {
                        component = (_a = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'component.nostyle.template'))) === null || _a === void 0 ? void 0 : _a.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path);
                        componentPath = (0, path_1.join)(process.cwd(), path, "".concat(fileName, ".component.tsx"));
                        if (((_b = config_1.Config.component) === null || _b === void 0 ? void 0 : _b.style) === true) {
                            component = (_c = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'component.template'))) === null || _c === void 0 ? void 0 : _c.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path);
                            style = (_d = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'style.template'))) === null || _d === void 0 ? void 0 : _d.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path);
                            stylePath = (0, path_1.join)(process.cwd(), path, "".concat(fileName, ".style.tsx"));
                            (0, fs_jetpack_1.write)(stylePath, style || '');
                            (0, log_1.Log)("    \u2705  Created ".concat(fileName, ".style.tsx").green);
                        }
                        (0, fs_jetpack_1.write)(componentPath, component || '');
                        (0, log_1.Log)("    \u2705  Created ".concat(fileName, ".component.tsx").green);
                        if ((_e = config_1.Config.component) === null || _e === void 0 ? void 0 : _e.test) {
                            test_1 = (_f = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'test.template'))) === null || _f === void 0 ? void 0 : _f.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName);
                            testPath = (0, path_1.join)(process.cwd(), path, "".concat(fileName, ".test.tsx"));
                            (0, fs_jetpack_1.write)(testPath, test_1 || '');
                            (0, log_1.Log)("    \u2705  Created ".concat(fileName, ".test.tsx").green);
                        }
                        index = (_g = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'index.nostyle.template'))) === null || _g === void 0 ? void 0 : _g.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path);
                        indexPath = (0, path_1.join)(process.cwd(), path, 'index.tsx');
                        if (((_h = config_1.Config.component) === null || _h === void 0 ? void 0 : _h.style) === true) {
                            index = (_j = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'index.template'))) === null || _j === void 0 ? void 0 : _j.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path).replaceAll('{{path}}', path);
                        }
                        (0, fs_jetpack_1.write)(indexPath, index || '');
                        (0, log_1.Log)('    ✅  Created index.tsx'.green);
                    }
                    else {
                        component = (_k = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'component', 'component.nostyle.template'))) === null || _k === void 0 ? void 0 : _k.replaceAll('{{name}}', name).replaceAll('{{prefix}}', fileName).replaceAll('{{path}}', path);
                        componentPath = (0, path_1.join)(process.cwd(), "".concat(path, ".tsx"));
                        (0, fs_jetpack_1.write)(componentPath, component || '');
                        (0, log_1.Log)("    \u2705  Created ".concat(path, ".tsx").green);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateComponent = generateComponent;
//# sourceMappingURL=component.js.map