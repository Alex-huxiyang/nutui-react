"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const path_1 = __importDefault(require("path"));
const babel_jest_1 = require("babel-jest");
const api_loader_js_1 = __importDefault(require("@tarojs/plugin-framework-react/dist/api-loader.js"));
require("@jest/transform");
const transform = (0, babel_jest_1.createTransformer)({
    presets: [
        ['taro', {
                framework: 'react',
                ts: true
            }],
        ["@babel/preset-env", {
                "modules": "commonjs"
            }],
        ["@babel/preset-react"],
        '@babel/preset-typescript'
    ]
});
const oldProcess = transform.process;
transform.process = (sourceText, sourcePath, options) => {
    // 劫持替换 @tarojs/taro => tarojs/taro-h5 + react runtime
    if (sourcePath.includes('test-utils-react/dist/jest/runtime/taro-h5.js')) {
        sourceText = (0, api_loader_js_1.default)(sourceText);
    }
    // TODO: 无法对组件库内的判断处理，可能会有问题
    // 劫持工程文件，把process.env.TARO_ENV替换为对应的运行时方便进行判断
    if (sourcePath.startsWith(path_1.default.join(process.cwd(), 'src'))) {
        sourceText = sourceText.replace(/process\.env\.TARO_ENV/g, "process.env.TARO_ENV_JEST || process.env.TARO_ENV");
    }
    return oldProcess(sourceText, sourcePath, options);
};
exports.default = transform;
