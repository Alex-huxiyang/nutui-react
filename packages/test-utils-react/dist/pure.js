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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.fireEvent = exports.act = exports.render = void 0;
const client_1 = __importDefault(require("react-dom/client"));
const test_utils_dom_1 = require("@tarojs/test-utils-dom");
const act_compat_1 = __importStar(require("./act-compat"));
exports.act = act_compat_1.default;
const fire_event_1 = require("./fire-event");
Object.defineProperty(exports, "fireEvent", { enumerable: true, get: function () { return fire_event_1.fireEvent; } });
const mountedContainers = new Set();
const mountedRootEntries = [];
function jestFakeTimersAreEnabled() {
    /* istanbul ignore else */
    if (typeof jest !== 'undefined' && jest !== null) {
        return (
        // legacy timers
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setTimeout._isMockFunction === true || // modern timers
            Object.prototype.hasOwnProperty.call(setTimeout, 'clock'));
    }
    return false;
}
(0, test_utils_dom_1.configure)({
    advanceTimersWrapper: cb => {
        return (0, act_compat_1.default)(cb);
    },
    asyncWrapper: (cb) => __awaiter(void 0, void 0, void 0, function* () {
        const previousActEnvironment = (0, act_compat_1.getIsReactActEnvironment)();
        (0, act_compat_1.setReactActEnvironment)(false);
        try {
            const result = yield cb();
            // Drain microtask queue.
            // Otherwise we'll restore the previous act() environment, before we resolve the `waitFor` call.
            // The caller would have no chance to wrap the in-flight Promises in `act()`
            yield new Promise(resolve => {
                setTimeout(() => { resolve(null); }, 0);
                if (jestFakeTimersAreEnabled()) {
                    jest.advanceTimersByTime(0);
                }
            });
            return result;
        }
        finally {
            (0, act_compat_1.setReactActEnvironment)(previousActEnvironment);
        }
    }),
    eventWrapper: cb => {
        let result;
        (0, act_compat_1.default)(() => {
            result = cb();
        });
        return result;
    }
});
function createConcurrentRoot(container) {
    const root = client_1.default.createRoot(container);
    return {
        render(element) {
            root.render(element);
        },
        unmount() {
            root.unmount();
        }
    };
}
function renderRoot(ui, params) {
    const { root, container, baseElement } = params;
    (0, act_compat_1.default)(() => {
        root.render(ui);
    });
    return {
        container,
        baseElement,
        unmount: () => {
            (0, act_compat_1.default)(() => {
                root.unmount();
            });
        },
        rerender: (rerenderUi) => {
            renderRoot(rerenderUi, {
                container,
                baseElement,
                root
            });
        }
    };
}
function render(ui, params) {
    let { container, baseElement = container } = params;
    if (!baseElement) {
        baseElement = document.body;
    }
    if (!container) {
        container = document.body.appendChild(document.createElement('div'));
    }
    let root;
    if (!mountedContainers.has(container)) {
        root = createConcurrentRoot(container);
        mountedContainers.add(container);
        mountedRootEntries.push({ container, root });
    }
    else {
        mountedRootEntries.forEach(rootEntry => {
            if (rootEntry.container === container) {
                root = rootEntry.root;
            }
        });
    }
    return renderRoot(ui, {
        container,
        baseElement,
        root: root,
    });
}
exports.render = render;
__exportStar(require("@tarojs/test-utils-dom"), exports);
