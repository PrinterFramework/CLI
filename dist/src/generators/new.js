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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewProject = void 0;
var prompts_1 = __importDefault(require("prompts"));
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var crypto_1 = require("crypto");
function generateNewProject(path) {
    if (path === void 0) { path = '.'; }
    return __awaiter(this, void 0, void 0, function () {
        var configPath, result, root, root_1, root_1_1, item, itemPath, contents, sessionPath, sessionContents, counterTypePath, counterTypeContents, scss, scss_1, scss_1_1, item, itemPath, contents, prisma, prisma_1, prisma_1_1, item, itemPath, contents, redux, redux_1, redux_1_1, item, itemPath, contents, reduxSlicePath, reduxSliceContents, app, app_1, app_1_1, item, itemPath, contents, components, components_1, components_1_1, item, itemPath, contents;
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    configPath = (0, path_1.join)(process.cwd(), path, 'printer.config.json');
                    if (!((0, fs_jetpack_1.exists)(configPath) !== false)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: 'confirm',
                            name: 'overwrite',
                            message: 'A project already exists here, overwrite it?'
                        })];
                case 1:
                    result = _g.sent();
                    if (result.overwrite === false) {
                        return [2 /*return*/];
                    }
                    _g.label = 2;
                case 2:
                    root = [
                        'printer.config.json',
                        '.env.dev.local',
                        '.eslintrc.js',
                        '.gitignore',
                        'middleware.tsx',
                        'next.config.js',
                        'package.json',
                        'README.md',
                        'tsconfig.json'
                    ];
                    try {
                        for (root_1 = __values(root), root_1_1 = root_1.next(); !root_1_1.done; root_1_1 = root_1.next()) {
                            item = root_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', "".concat(item, ".template"))) || '';
                            if (item === '.env.dev.local') {
                                contents = contents.replaceAll('{{password}}', (0, crypto_1.randomBytes)(32).toString('hex'));
                            }
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created ".concat(item).green);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (root_1_1 && !root_1_1.done && (_a = root_1.return)) _a.call(root_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    (0, fs_jetpack_1.write)((0, path_1.join)(process.cwd(), path, 'public', '.gitkeep'), '');
                    sessionPath = (0, path_1.join)(process.cwd(), path, 'util', 'session.ts');
                    sessionContents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'util', 'session.ts.template')) || '';
                    sessionContents = sessionContents.replaceAll('{{password}}', (0, crypto_1.randomBytes)(32).toString('hex'));
                    (0, fs_jetpack_1.write)(sessionPath, sessionContents);
                    (0, log_1.Log)('    ✅  Created util/session.ts'.green);
                    counterTypePath = (0, path_1.join)(process.cwd(), path, 'types', 'counter.tsx');
                    counterTypeContents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'types', 'counter.tsx.template')) || '';
                    (0, fs_jetpack_1.write)(counterTypePath, counterTypeContents);
                    (0, log_1.Log)('    ✅  Created types/counter.tsx'.green);
                    scss = [
                        'printer.scss',
                        'reset.scss',
                        'theme.scss',
                        'ui.scss',
                        'index.scss'
                    ];
                    try {
                        for (scss_1 = __values(scss), scss_1_1 = scss_1.next(); !scss_1_1.done; scss_1_1 = scss_1.next()) {
                            item = scss_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, 'scss', item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'scss', "".concat(item, ".template"))) || '';
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created scss/".concat(item).green);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (scss_1_1 && !scss_1_1.done && (_b = scss_1.return)) _b.call(scss_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    prisma = [
                        'client.ts',
                        'schema.prisma'
                    ];
                    try {
                        for (prisma_1 = __values(prisma), prisma_1_1 = prisma_1.next(); !prisma_1_1.done; prisma_1_1 = prisma_1.next()) {
                            item = prisma_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, 'prisma', item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'prisma', "".concat(item, ".template"))) || '';
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created prisma/".concat(item).green);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (prisma_1_1 && !prisma_1_1.done && (_c = prisma_1.return)) _c.call(prisma_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    redux = [
                        'hooks.tsx',
                        'provider.tsx',
                        'reducer.tsx',
                        'reducers.json',
                        'store.tsx'
                    ];
                    try {
                        for (redux_1 = __values(redux), redux_1_1 = redux_1.next(); !redux_1_1.done; redux_1_1 = redux_1.next()) {
                            item = redux_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, 'redux', item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'redux', "".concat(item, ".template"))) || '';
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created redux/".concat(item).green);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (redux_1_1 && !redux_1_1.done && (_d = redux_1.return)) _d.call(redux_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    reduxSlicePath = (0, path_1.join)(process.cwd(), path, 'redux', 'slice', 'counter.tsx');
                    reduxSliceContents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'redux', 'slice', 'counter.tsx.template')) || '';
                    (0, fs_jetpack_1.write)(reduxSlicePath, reduxSliceContents);
                    (0, log_1.Log)('    ✅  Created redux/slice/counter.tsx'.green);
                    app = [
                        'layout.tsx',
                        'page.tsx'
                    ];
                    try {
                        for (app_1 = __values(app), app_1_1 = app_1.next(); !app_1_1.done; app_1_1 = app_1.next()) {
                            item = app_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, 'app', item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'app', "".concat(item, ".template"))) || '';
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created app/".concat(item).green);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (app_1_1 && !app_1_1.done && (_e = app_1.return)) _e.call(app_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    components = [
                        'counter.tsx'
                    ];
                    try {
                        for (components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                            item = components_1_1.value;
                            itemPath = (0, path_1.join)(process.cwd(), path, 'components', item);
                            contents = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'components', "".concat(item, ".template"))) || '';
                            (0, fs_jetpack_1.write)(itemPath, contents);
                            (0, log_1.Log)("    \u2705  Created components/".concat(item).green);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (components_1_1 && !components_1_1.done && (_f = components_1.return)) _f.call(components_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateNewProject = generateNewProject;
//# sourceMappingURL=new.js.map