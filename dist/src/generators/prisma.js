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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrismaTypes = exports.generateImports = void 0;
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var typeMatches = [
    {
        type: 'number',
        matches: ['INT', 'TINYINT', 'SMALLINT', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL']
    },
    {
        type: 'string',
        matches: ['STRING', 'CHAR', 'VARCHAR', 'TEXT']
    },
    {
        type: 'Date',
        matches: ['DATE', 'DATETIME', 'TIMESTAMP']
    }
];
function formatModel(models) {
    var e_1, _a, e_2, _b, e_3, _c;
    var formattedModels = [];
    var names = models.map(function (item) { return item.name.toUpperCase(); });
    try {
        for (var models_1 = __values(models), models_1_1 = models_1.next(); !models_1_1.done; models_1_1 = models_1.next()) {
            var model = models_1_1.value;
            var type = model.type.toUpperCase().trim();
            var tm = type.replaceAll('[]', '');
            var imported = false;
            var newType = 'any';
            try {
                for (var typeMatches_1 = (e_2 = void 0, __values(typeMatches)), typeMatches_1_1 = typeMatches_1.next(); !typeMatches_1_1.done; typeMatches_1_1 = typeMatches_1.next()) {
                    var typeMatch = typeMatches_1_1.value;
                    if (typeMatch.matches.indexOf(tm) !== -1) {
                        newType = typeMatch.type;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (typeMatches_1_1 && !typeMatches_1_1.done && (_b = typeMatches_1.return)) _b.call(typeMatches_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (newType === 'any' && names.includes(model.name.toUpperCase())) {
                try {
                    for (var models_2 = (e_3 = void 0, __values(models)), models_2_1 = models_2.next(); !models_2_1.done; models_2_1 = models_2.next()) {
                        var model_1 = models_2_1.value;
                        if (type === model_1.type.toUpperCase().trim()) {
                            newType = (model_1.type[0].toUpperCase() + model_1.type.substring(1) + 'Type').replaceAll('[', '').replaceAll(']', '');
                            imported = true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (models_2_1 && !models_2_1.done && (_c = models_2.return)) _c.call(models_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            var inputType = newType;
            if (type.indexOf('[]') !== -1) {
                inputType += '[]';
            }
            formattedModels.push({
                original: model.type,
                name: model.name,
                type: inputType,
                imported: imported
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return formattedModels;
}
function generateImports(models) {
    var e_4, _a;
    var output = '';
    var hasImports = false;
    try {
        for (var models_3 = __values(models), models_3_1 = models_3.next(); !models_3_1.done; models_3_1 = models_3.next()) {
            var model = models_3_1.value;
            if (model.imported) {
                var name = (model.original[0].toUpperCase() + model.original.substring(1)).replaceAll('[', '').replaceAll(']', '');
                output += "import ".concat(name, "Type from 'types/prisma/").concat(name, "'\n");
                hasImports = true;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (models_3_1 && !models_3_1.done && (_a = models_3.return)) _a.call(models_3);
        }
        finally { if (e_4) throw e_4.error; }
    }
    if (hasImports) {
        output += '\n';
    }
    return output;
}
exports.generateImports = generateImports;
function generatePrismaTypes() {
    return __awaiter(this, void 0, void 0, function () {
        var prismaPath, prismaFile, matches, matches_1, matches_1_1, match, models, index, data, name, match2, indexEnd, modelContent, lines, lines_1, lines_1_1, line, lineFmt, tokens, tokenFmt, name_1, type, dataMap, importMap, typeFile, typeInject, dataMap_1, dataMap_1_1, item, typePath;
        var e_5, _a, e_6, _b, e_7, _c;
        return __generator(this, function (_d) {
            prismaPath = (0, path_1.join)(process.cwd(), 'prisma', 'schema.prisma');
            prismaFile = (0, fs_jetpack_1.read)(prismaPath) || '';
            matches = __spreadArray([], __read(prismaFile.matchAll(/^.*model.*$/gim)), false);
            try {
                for (matches_1 = __values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                    match = matches_1_1.value;
                    if (match[0].indexOf('{') !== -1) {
                        models = [];
                        index = match.index;
                        data = prismaFile.slice(index, prismaFile.length);
                        name = '';
                        match2 = __spreadArray([], __read(data.matchAll(/\}/gim)), false);
                        if (match2) {
                            indexEnd = match2[0].index;
                            modelContent = data.slice(0, indexEnd).split('{')[1].trim();
                            name = data.slice(0, indexEnd).split('{')[0].replace('model', '').trim();
                            lines = modelContent.split('\n').filter(function (line) { return line.indexOf('@@') === -1; });
                            try {
                                for (lines_1 = (e_6 = void 0, __values(lines)), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                                    line = lines_1_1.value;
                                    lineFmt = line.trim();
                                    tokens = lineFmt.split(' ');
                                    tokenFmt = tokens.filter(function (token) { return token !== ''; });
                                    name_1 = (tokenFmt[0] || '');
                                    type = (tokenFmt[1] || '').toLowerCase();
                                    if (name_1 && type) {
                                        models.push({ original: type, name: name_1, type: type, imported: false });
                                    }
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (lines_1_1 && !lines_1_1.done && (_b = lines_1.return)) _b.call(lines_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                        dataMap = formatModel(models);
                        importMap = generateImports(dataMap);
                        typeFile = '{{imports}}' + "export interface ".concat(name, "Type {{{injection}}}") + '\n\n' + "export default ".concat(name, "Type") + '\n';
                        typeInject = '';
                        try {
                            for (dataMap_1 = (e_7 = void 0, __values(dataMap)), dataMap_1_1 = dataMap_1.next(); !dataMap_1_1.done; dataMap_1_1 = dataMap_1.next()) {
                                item = dataMap_1_1.value;
                                typeInject += '\t' + item.name + '?: ' + item.type + '\n';
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (dataMap_1_1 && !dataMap_1_1.done && (_c = dataMap_1.return)) _c.call(dataMap_1);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        typeFile = typeFile.replace('{{injection}}', '\n' + typeInject);
                        typeFile = typeFile.replace('{{imports}}', importMap);
                        typePath = (0, path_1.join)(process.cwd(), 'types', 'prisma', "".concat(name, ".tsx"));
                        (0, log_1.Log)("    \u2705  Generated types/prisma/".concat(name, ".tsx").green);
                        (0, fs_jetpack_1.write)(typePath, typeFile || '');
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return [2 /*return*/];
        });
    });
}
exports.generatePrismaTypes = generatePrismaTypes;
//# sourceMappingURL=prisma.js.map