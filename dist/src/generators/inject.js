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
exports.inject = void 0;
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var match_1 = require("../helpers/match");
function inject(slice, component, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, pathArray, fileName, fileContents, fileComponentPath, slicePath, sliceContents, matches, splitFile, sliceMatch, newContents, stateInjections, actionInjections, i, index, match, decorator, typeMap, varKey, addDots, varKey, hasExistingImport, i, stateInjection, typeName, i, stateInjection, injectionLine, tempContents, typeMap, value, spreadLeft, spreadRight, typeName, injectionLine, tempContents, tempContents, fileComponentPath;
        return __generator(this, function (_a) {
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
            slicePath = (0, path_1.join)(process.cwd(), 'redux', 'slice', "".concat(slice, ".tsx"));
            sliceContents = (0, fs_jetpack_1.read)(slicePath) || '';
            matches = (0, match_1.findMatches)(sliceContents, /@printer/gmi);
            splitFile = sliceContents.split('\n');
            sliceMatch = (0, match_1.findMatches)(sliceContents, match_1.SliceMatcher)[0];
            newContents = fileContents;
            stateInjections = [];
            actionInjections = [];
            for (i = 0; i < matches.length; i++) {
                index = matches[i];
                match = splitFile[index + 1];
                decorator = splitFile[index].trim().split('::');
                typeMap = '';
                if (decorator.length > 2) {
                    typeMap = decorator[2];
                }
                if (index < sliceMatch) {
                    varKey = match.split(':')[0].trim();
                    addDots = (0, match_1.findMatches)(match, match_1.BraceMatcher).length > 0 || (0, match_1.findMatches)(match, match_1.BraceMatcher2).length > 0;
                    stateInjections.push({ value: varKey, type: typeMap, addDots: addDots });
                }
                else {
                    varKey = match.split('(')[0].trim();
                    actionInjections.push(varKey);
                }
            }
            if (stateInjections.length === 0 && actionInjections.length === 0) {
                (0, log_1.Log)('    ⚠️  No printer decorators were found in the slice'.yellow);
                return [2 /*return*/];
            }
            hasExistingImport = (0, match_1.findMatches)(newContents, match_1.ReduxOptionalMatcher);
            if (hasExistingImport.length > 0) {
                newContents = newContents.replace(match_1.ReduxOptionalMatcher, 'import { useSelector, useDispatch } from \'react-redux\'');
            }
            else {
                newContents = "import { useSelector, useDispatch } from 'react-redux'\n\n".concat(newContents);
            }
            if (opts.state) {
                for (i = 0; i < stateInjections.length; i++) {
                    stateInjection = stateInjections[i];
                    if (stateInjection.type) {
                        typeName = "".concat(stateInjection.type[0].toUpperCase() + stateInjection.type.substring(1), "Type");
                        if (typeName.indexOf('[]') !== -1) {
                            typeName = typeName.replaceAll('[]', '');
                        }
                        if ((0, match_1.findMatches)(newContents, (0, match_1.typeMatcher)(typeName)).length === 0) {
                            newContents = "import ".concat(typeName, " from 'types/").concat(stateInjection.type.replaceAll('[]', ''), "'\n").concat(newContents);
                        }
                    }
                }
                for (i = 0; i < stateInjections.length; i++) {
                    stateInjection = stateInjections[i];
                    if ((0, match_1.findMatches)(newContents, (0, match_1.selectorMatcher)(stateInjection.value)).length === 0) {
                        injectionLine = (0, match_1.findMatches)(newContents, (0, match_1.functionMatcher)(fileName))[0];
                        tempContents = newContents.split('\n');
                        typeMap = 'any';
                        value = stateInjection.value;
                        spreadLeft = '{';
                        spreadRight = '}';
                        if (stateInjection.type) {
                            typeName = stateInjection.type[0].toUpperCase() + stateInjection.type.substring(1) + 'Type';
                            if (typeName.indexOf('[]') !== -1) {
                                typeName = typeName.replaceAll('[]', '') + '[]';
                                value = value.replaceAll('[]', '');
                                spreadLeft = '[';
                                spreadRight = ']';
                            }
                            typeMap = "{ ".concat(slice, ": { ").concat(value, ": ").concat(typeName, " } }");
                        }
                        tempContents[injectionLine] = tempContents[injectionLine] + "\n  const ".concat(value, " = useSelector((state: ").concat(typeMap, ") => ").concat(stateInjection.addDots ? '(' + spreadLeft + ' ' : '').concat(stateInjection.addDots ? '...' : '', "state.").concat(slice, ".").concat(value).concat(stateInjection.addDots ? ' ' + spreadRight + ')' : '', ")");
                        if (i === 0) {
                            tempContents[injectionLine] = tempContents[injectionLine] + '\n';
                        }
                        newContents = tempContents.join('\n');
                    }
                    (0, log_1.Log)("    \u2705  State '".concat(stateInjection.value, "' was injected into the component ").concat(stateInjection.type ? "with the type ".concat(stateInjection.type) : '').green);
                }
            }
            if (opts.action) {
                if (actionInjections.length > 0) {
                    if ((0, match_1.findMatches)(newContents, match_1.DispatchMatcher).length === 0) {
                        injectionLine = (0, match_1.findMatches)(newContents, (0, match_1.functionMatcher)(fileName))[0];
                        tempContents = newContents.split('\n');
                        tempContents[injectionLine] = tempContents[injectionLine] + '\n  const dispatch = useDispatch()';
                        newContents = tempContents.join('\n');
                    }
                    if ((0, match_1.findMatches)(newContents, (0, match_1.actionMatcher)(actionInjections)).length > 0) {
                        newContents = newContents.replace((0, match_1.actionMatcher)(actionInjections), "import { ".concat(actionInjections.join(', '), " } from 'redux/slice/").concat(slice, "'"));
                    }
                    else {
                        tempContents = newContents.split('\n');
                        tempContents[0] = tempContents[0] + "\nimport { ".concat(actionInjections.join(', '), " } from 'redux/slice/").concat(slice, "'");
                        newContents = tempContents.join('\n');
                    }
                    (0, log_1.Log)("    \u2705  ".concat(actionInjections.length, " action").concat(actionInjections.length > 1 ? 's were' : ' was', " injected into the component").green);
                }
            }
            if ((0, fs_jetpack_1.exists)(filePath) === 'dir') {
                fileComponentPath = (0, path_1.join)(process.cwd(), component, "".concat(fileName, ".component.tsx"));
                (0, fs_jetpack_1.write)(fileComponentPath, newContents);
            }
            else {
                (0, fs_jetpack_1.write)("".concat(filePath, ".tsx"), newContents);
            }
            return [2 /*return*/];
        });
    });
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map