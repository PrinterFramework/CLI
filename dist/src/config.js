"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerConfig = exports.Config = void 0;
var fs_jetpack_1 = require("fs-jetpack");
var path_1 = require("path");
var log_1 = require("./helpers/log");
exports.Config = {
    crud: {
        create: true,
        update: true,
        delete: true,
        list: true,
        get: true
    }
};
function registerConfig() {
    try {
        var config = (0, fs_jetpack_1.read)((0, path_1.join)(process.cwd(), 'printer.config.json')) || '';
        var data = JSON.parse(config);
        exports.Config = Object.assign(exports.Config, __assign({}, data));
    }
    catch (error) {
        (0, log_1.Log)('👷  Could not load Printer config'.yellow);
    }
}
exports.registerConfig = registerConfig;
//# sourceMappingURL=config.js.map