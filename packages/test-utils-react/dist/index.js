"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const path_1 = require("path");
const router_1 = require("@tarojs/router");
const runtime_1 = require("@tarojs/runtime");
const runtime_2 = require("@tarojs/plugin-framework-react/dist/runtime");
const test_utils_dom_1 = require("@tarojs/test-utils-dom");
const test_utils_shared_1 = require("@tarojs/test-utils-shared");
const pure_1 = require("./pure");
const waitRAF = () => new Promise(resolve => requestAnimationFrame(resolve));
window.React = React;
class ReactTestUtil {
    constructor() {
        this.fireEvent = pure_1.fireEvent;
        this.queries = new test_utils_dom_1.Queries();
        this.act = pure_1.act;
        this.AppLifecycle = test_utils_shared_1.app;
        this.PageLifecycle = test_utils_shared_1.page;
    }
    mount(ui, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { props, container, baseElement } = params;
            this._inst = (0, pure_1.render)(React.createElement(ui, props), {
                container,
                baseElement
            });
            // 等待web component渲染完成
            yield waitRAF();
        });
    }
    unmout() {
        this._inst.unmount();
    }
    createApp() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            global.defineAppConfig = c => c; // 删除宏
            const appPath = process.cwd(); // 入口目录
            // 自动引入
            const app = require((0, path_1.join)(appPath, 'src', 'app')).default;
            const config = require((0, path_1.join)(appPath, 'src', 'app.config')).default;
            if (!app || !config) {
                throw new Error('找不到app/app.config路径');
            }
            config.routes = config.pages.map(path => ({
                path,
                load: function (context, params) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const page = require((0, path_1.join)(appPath, 'src', context.route.path)).default;
                        return [page, context, params];
                    });
                }
            }));
            config.router = { mode: 'hash' };
            const appInst = (0, runtime_2.createReactApp)(app, React, client_1.default, config);
            (0, test_utils_shared_1.proxyAppLifeCycle)(appInst);
            // TODO 
            runtime_1.Current.page = {
                path: '/pages/index/index'
            };
            document.body.innerHTML = `<div id="app"><div id="${runtime_1.Current.page.path}" class="taro_page" /></div>`;
            // @ts-ignore
            (0, router_1.createRouter)(appInst, config, 'React');
            yield waitRAF();
            return {
                app: appInst,
                page: runtime_1.Current.page
            };
        });
    }
    html() {
        if (this._inst) {
            if (!document.contains(this._inst.container)) {
                throw new Error('container 节点没有挂载到document上！这将导致WebComponent无法触发生命周期导致无法正常渲染');
            }
            return (0, test_utils_dom_1.prettyDOM)(this._inst.baseElement);
        }
        return (0, test_utils_dom_1.prettyDOM)(document.body);
    }
}
exports.default = ReactTestUtil;
