#!/usr/bin/env node

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
exports.Printer = void 0;
require("colors");
var commander_1 = require("commander");
var log_1 = require("./helpers/log");
var config_1 = require("./config");
var new_1 = require("./generators/new");
var component_1 = require("./generators/component");
var slice_1 = require("./generators/slice");
var type_1 = require("./generators/type");
var page_1 = require("./generators/page");
var api_1 = require("./generators/api");
var crud_1 = require("./generators/crud");
var scss_1 = require("./generators/scss");
var inject_1 = require("./generators/inject");
var prisma_1 = require("./generators/prisma");
var superagent_1 = require("./generators/superagent");
exports.Printer = new commander_1.Command('🖨️ Printer');
exports.Printer
    .version('1.3.2')
    .description('🖨️ Printer: Automation Tooling for Next, Redux and Prisma.')
    .option('-a, --no-action', 'do not inject actions', false)
    .option('-s, --no-state', 'do not inject state', false);
exports.Printer
    .command('new [path]')
    .description('Generate a new Printer project')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating new Printer project'.green);
                return [4 /*yield*/, (0, new_1.generateNewProject)(path || '.')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('component <path>')
    .description('Generate a new Printer component')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)("\uD83D\uDC77  Generating new Printer component ".concat(path).green);
                return [4 /*yield*/, (0, component_1.generateComponent)(path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('type <path>')
    .description('Generate a new Printer type')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)("\uD83D\uDC77  Generating new Printer type ".concat(path).green);
                return [4 /*yield*/, (0, type_1.generateType)(path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('inject <slice> <component>')
    .description('Inject a slice into a component or page')
    .action(function (slice, component) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)("\uD83D\uDC89  Injecting ".concat(slice, " into ").concat(component).green);
                return [4 /*yield*/, (0, inject_1.inject)(slice, component, exports.Printer.opts())];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('slice <name>')
    .description('Generate a new Printer slice')
    .action(function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)("\uD83D\uDC77  Generating new Printer slice ".concat(name).green);
                return [4 /*yield*/, (0, slice_1.generateSlice)(name)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('page <path>')
    .description('Generate a new Printer page')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating new Printer page'.green);
                return [4 /*yield*/, (0, page_1.generatePage)(path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('api <path>')
    .description('Generate a new Printer API route')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating new Printer API route'.green);
                return [4 /*yield*/, (0, api_1.generateApi)(path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('scss <path>')
    .description('Generate a new Printer SCSS file')
    .action(function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating new Printer SCSS file'.green);
                return [4 /*yield*/, (0, scss_1.generateScss)(path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('superagent <type> <path>')
    .description('Generate a new Superagent request flow')
    .action(function (type, path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating new Superagent request flow for'.green, path);
                return [4 /*yield*/, (0, superagent_1.injectSupergent)(String(type).toUpperCase(), path)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('prisma')
    .description('Generate dynamic prisma types based on prisma/schema.prisma')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)('👷  Generating prisma types'.green);
                return [4 /*yield*/, (0, prisma_1.generatePrismaTypes)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.Printer
    .command('crud <model>')
    .description('Generate a CRUD boilerplate for a Prisma model')
    .action(function (model) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.registerConfig)();
                (0, log_1.Log)("\uD83D\uDC77  Generating new CRUD boilerplate for ".concat(model).green);
                return [4 /*yield*/, (0, crud_1.generateCrud)(model)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
if (process.env.NODE_ENV !== 'test') {
    exports.Printer.parse(process.argv);
}
//# sourceMappingURL=printer.js.map