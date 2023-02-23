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
exports.generateNewProject = void 0;
var prompts_1 = __importDefault(require("prompts"));
var path_1 = require("path");
var fs_jetpack_1 = require("fs-jetpack");
var log_1 = require("../helpers/log");
var crypto_1 = require("crypto");
function generateNewProject(path) {
    var _a;
    if (path === void 0) { path = '.'; }
    return __awaiter(this, void 0, void 0, function () {
        var readmePath, appPath, documentPath, babelPath, gitignorePath, gitkeepPath, envdevPath, gitkeepPublicPath, indexPath, utilSessionPath, resetCssPath, printerScssPath, themeScssPath, uiScssPath, prismaClientPath, prismaSchemaPath, packagePath, wrapperPath, reducerPath, reducersPath, tsconfigPath, precommitPath, eslintrcPath, printerConfigPath, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    readmePath = (0, path_1.join)(process.cwd(), path, 'README.md');
                    appPath = (0, path_1.join)(process.cwd(), path, 'pages', '_app.tsx');
                    documentPath = (0, path_1.join)(process.cwd(), path, 'pages', '_document.tsx');
                    babelPath = (0, path_1.join)(process.cwd(), path, '.babelrc');
                    gitignorePath = (0, path_1.join)(process.cwd(), path, '.gitignore');
                    gitkeepPath = (0, path_1.join)(process.cwd(), path, '.gitkeep');
                    envdevPath = (0, path_1.join)(process.cwd(), path, '.env.dev');
                    gitkeepPublicPath = (0, path_1.join)(process.cwd(), path, 'public', '.gitkeep');
                    indexPath = (0, path_1.join)(process.cwd(), path, 'pages', 'index.tsx');
                    utilSessionPath = (0, path_1.join)(process.cwd(), path, 'util', 'session.ts');
                    resetCssPath = (0, path_1.join)(process.cwd(), path, 'scss', 'reset.scss');
                    printerScssPath = (0, path_1.join)(process.cwd(), path, 'scss', 'printer.scss');
                    themeScssPath = (0, path_1.join)(process.cwd(), path, 'scss', 'theme.scss');
                    uiScssPath = (0, path_1.join)(process.cwd(), path, 'scss', 'ui.scss');
                    prismaClientPath = (0, path_1.join)(process.cwd(), path, 'prisma', 'client.ts');
                    prismaSchemaPath = (0, path_1.join)(process.cwd(), path, 'prisma', 'schema.prisma');
                    packagePath = (0, path_1.join)(process.cwd(), path, 'package.json');
                    wrapperPath = (0, path_1.join)(process.cwd(), path, 'redux', 'wrapper.tsx');
                    reducerPath = (0, path_1.join)(process.cwd(), path, 'redux', 'reducer.tsx');
                    reducersPath = (0, path_1.join)(process.cwd(), path, 'redux', 'reducers.json');
                    tsconfigPath = (0, path_1.join)(process.cwd(), path, 'tsconfig.json');
                    precommitPath = (0, path_1.join)(process.cwd(), path, '.husky', 'pre-commit');
                    eslintrcPath = (0, path_1.join)(process.cwd(), path, '.eslintrc.js');
                    printerConfigPath = (0, path_1.join)(process.cwd(), path, 'printer.config.json');
                    if (!((0, fs_jetpack_1.exists)(printerConfigPath) !== false)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: 'confirm',
                            name: 'overwrite',
                            message: 'A project already exists here, overwrite it?'
                        })];
                case 1:
                    result = _b.sent();
                    if (result.overwrite === false) {
                        return [2 /*return*/];
                    }
                    _b.label = 2;
                case 2:
                    (0, fs_jetpack_1.write)(readmePath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'readme.template')) || '');
                    (0, log_1.Log)('    ✅  Created README.md'.green);
                    (0, fs_jetpack_1.write)(babelPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'babelrc.template')) || '');
                    (0, log_1.Log)('    ✅  Created .babelrc'.green);
                    (0, fs_jetpack_1.write)(gitignorePath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'gitignore.template')) || '');
                    (0, log_1.Log)('    ✅  Created .gitignore'.green);
                    (0, fs_jetpack_1.write)(gitkeepPath, '');
                    (0, log_1.Log)('    ✅  Created .gitkeep'.green);
                    (0, fs_jetpack_1.write)(envdevPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'env.dev.template')) || '');
                    (0, log_1.Log)('    ✅  Created .env.dev'.green);
                    (0, fs_jetpack_1.write)(gitkeepPublicPath, '');
                    (0, log_1.Log)('    ✅  Created public/.gitkeep'.green);
                    (0, fs_jetpack_1.write)(appPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', '_app.template')) || '');
                    (0, log_1.Log)('    ✅  Created pages/_app.tsx'.green);
                    (0, fs_jetpack_1.write)(documentPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', '_document.template')) || '');
                    (0, log_1.Log)('    ✅  Created pages/_document.tsx'.green);
                    (0, fs_jetpack_1.write)(indexPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'index.template')) || '');
                    (0, log_1.Log)('    ✅  Created pages/index.tsx'.green);
                    (0, fs_jetpack_1.write)(utilSessionPath, ((_a = (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'session.template'))) === null || _a === void 0 ? void 0 : _a.replaceAll('{{password}}', (0, crypto_1.randomBytes)(32).toString('hex'))) || '');
                    (0, log_1.Log)('    ✅  Created util/session.ts'.green);
                    (0, fs_jetpack_1.write)(resetCssPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'reset.template')) || '');
                    (0, log_1.Log)('    ✅  Created scss/reset.css'.green);
                    (0, fs_jetpack_1.write)(printerScssPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'printer.template')) || '');
                    (0, log_1.Log)('    ✅  Created scss/printer.scss'.green);
                    (0, fs_jetpack_1.write)(themeScssPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'theme.template')) || '');
                    (0, log_1.Log)('    ✅  Created scss/theme.scss'.green);
                    (0, fs_jetpack_1.write)(uiScssPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'ui.template')) || '');
                    (0, log_1.Log)('    ✅  Created scss/ui.scss'.green);
                    (0, fs_jetpack_1.write)(prismaClientPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'prisma.client.template')) || '');
                    (0, log_1.Log)('    ✅  Created prisma/client.ts'.green);
                    (0, fs_jetpack_1.write)(prismaSchemaPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'schema.prisma.template')) || '');
                    (0, log_1.Log)('    ✅  Created prisma/schema.prisma'.green);
                    (0, fs_jetpack_1.write)(packagePath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'package.template')) || '');
                    (0, log_1.Log)('    ✅  Created package.json'.green);
                    (0, fs_jetpack_1.write)(wrapperPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'wrapper.template')) || '');
                    (0, log_1.Log)('    ✅  Created redux/wrapper.tsx'.green);
                    (0, fs_jetpack_1.write)(reducerPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'reducer.template')) || '');
                    (0, log_1.Log)('    ✅  Created redux/reducer.tsx'.green);
                    (0, fs_jetpack_1.write)(reducersPath, '[]');
                    (0, log_1.Log)('    ✅  Created redux/reducers.json'.green);
                    (0, fs_jetpack_1.write)(tsconfigPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'tsconfig.template')) || '');
                    (0, log_1.Log)('    ✅  Created tsconfig.json'.green);
                    (0, fs_jetpack_1.write)(precommitPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'precommit.template')) || '');
                    (0, log_1.Log)('    ✅  Created .husky/pre-commit'.green);
                    (0, fs_jetpack_1.write)(eslintrcPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'eslintrc.template')) || '');
                    (0, log_1.Log)('    ✅  Created printer.config.json'.green);
                    (0, fs_jetpack_1.write)(printerConfigPath, (0, fs_jetpack_1.read)((0, path_1.join)(__dirname, '..', 'templates', 'new', 'printer.config.template')) || '');
                    (0, log_1.Log)('    ✅  Created .eslintrc.js'.green);
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateNewProject = generateNewProject;
//# sourceMappingURL=new.js.map