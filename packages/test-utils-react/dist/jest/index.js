"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initConfig_js_1 = __importDefault(require("./initConfig.js"));
function defineJestConfig(config) {
    const { globals, moduleNameMapper } = config, otherConfig = __rest(config, ["globals", "moduleNameMapper"]);
    const finalConfig = Object.assign({}, initConfig_js_1.default, otherConfig);
    if (globals) {
        Object.assign(finalConfig.globals, globals);
    }
    if (moduleNameMapper) {
        Object.assign(finalConfig.moduleNameMapper, moduleNameMapper);
    }
    return finalConfig;
}
exports.default = defineJestConfig;
