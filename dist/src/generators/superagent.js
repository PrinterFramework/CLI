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
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectSupergent = void 0;
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var match_1 = require("../helpers/match");
function injectSupergent(type, component) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var filePath, pathArray, fileName, fileContents, fileComponentPath, injectionLine, tempContents, superAgentFlow, newContents, fileComponentPath;
        return __generator(this, function (_b) {
            filePath = (0, path_1.join)(process.cwd(), component);
            pathArray = component.split('/');
            fileName = pathArray[pathArray.length - 1];
            fileContents = '';
            if (filePath.indexOf('.tsx') === -1) {
                if ((0, fs_jetpack_1.exists)(filePath) === 'dir') {
                    fileComponentPath = (0, path_1.join)(process.cwd(), component, "".concat(fileName, ".component.tsx"));
                    fileContents = (0, fs_jetpack_1.read)(fileComponentPath) || '';
                }
                else {
                    fileContents = (0, fs_jetpack_1.read)("".concat(filePath, ".tsx")) || '';
                }
            }
            else {
                fileContents = (0, fs_jetpack_1.read)("".concat(filePath)) || '';
            }
            if ((0, match_1.findMatches)(fileContents, (0, match_1.stateMatcher)()).length === 0) {
                fileContents = 'import { useState } from \'react\'' + '\n' + fileContents;
            }
            if ((0, match_1.findMatches)(fileContents, (0, match_1.effectMatcher)()).length === 0) {
                fileContents = 'import { useEffect } from \'react\'' + '\n' + fileContents;
            }
            if ((0, match_1.findMatches)(fileContents, (0, match_1.superagentMatcher)(type)).length === 0) {
                fileContents = "import { ".concat(type.toLowerCase(), " } from 'superagent'") + '\n' + fileContents;
            }
            injectionLine = (0, match_1.findMatches)(fileContents, (0, match_1.functionMatcher)(fileName.replaceAll('.tsx', '')))[0];
            tempContents = fileContents.split('\n');
            superAgentFlow = ((_a = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'superagent.template'))) === null || _a === void 0 ? void 0 : _a.replaceAll('{{type}}', type.toLowerCase())) || '';
            tempContents[injectionLine] += '\n' + superAgentFlow + '\n';
            newContents = tempContents.join('\n');
            if ((0, fs_jetpack_1.exists)(filePath) === 'dir') {
                fileComponentPath = (0, path_1.join)(process.cwd(), component, "".concat(fileName, ".component.tsx"));
                (0, fs_jetpack_1.write)(fileComponentPath, newContents);
                (0, log_1.Log)("    \u2705  Updated ".concat(fileComponentPath).green);
            }
            else {
                (0, fs_jetpack_1.write)("".concat(filePath), newContents);
                (0, log_1.Log)("    \u2705  Updated ".concat(component.replace('.tsx', ''), ".tsx").green);
            }
            return [2 /*return*/];
        });
    });
}
exports.injectSupergent = injectSupergent;
//# sourceMappingURL=superagent.js.map