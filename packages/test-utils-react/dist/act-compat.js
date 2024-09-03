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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsReactActEnvironment = exports.setReactActEnvironment = void 0;
const testUtils = __importStar(require("react-dom/test-utils"));
const domAct = testUtils.act;
function getGlobalThis() {
    /* istanbul ignore else */
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    /* istanbul ignore next */
    if (typeof self !== 'undefined') {
        return self;
    }
    /* istanbul ignore next */
    if (typeof window !== 'undefined') {
        return window;
    }
    /* istanbul ignore next */
    if (typeof global !== 'undefined') {
        return global;
    }
    /* istanbul ignore next */
    throw new Error('unable to locate global object');
}
function setIsReactActEnvironment(isReactActEnvironment) {
    getGlobalThis().IS_REACT_ACT_ENVIRONMENT = isReactActEnvironment;
}
exports.setReactActEnvironment = setIsReactActEnvironment;
function getIsReactActEnvironment() {
    return getGlobalThis().IS_REACT_ACT_ENVIRONMENT;
}
exports.getIsReactActEnvironment = getIsReactActEnvironment;
function withGlobalActEnvironment(actImplementation) {
    return callback => {
        const previousActEnvironment = getIsReactActEnvironment();
        setIsReactActEnvironment(true);
        try {
            // The return value of `act` is always a thenable.
            let callbackNeedsToBeAwaited = false;
            const actResult = actImplementation(() => {
                const result = callback();
                if (result !== null &&
                    typeof result === 'object' &&
                    typeof result.then === 'function') {
                    callbackNeedsToBeAwaited = true;
                }
                return result;
            });
            if (callbackNeedsToBeAwaited) {
                const thenable = actResult;
                return {
                    then: (resolve, reject) => {
                        thenable.then(returnValue => {
                            setIsReactActEnvironment(previousActEnvironment);
                            resolve(returnValue);
                        }, error => {
                            setIsReactActEnvironment(previousActEnvironment);
                            reject(error);
                        });
                    },
                };
            }
            else {
                setIsReactActEnvironment(previousActEnvironment);
                return actResult;
            }
        }
        catch (error) {
            // Can't be a `finally {}` block since we don't know if we have to immediately restore IS_REACT_ACT_ENVIRONMENT
            // or if we have to await the callback first.
            setIsReactActEnvironment(previousActEnvironment);
            throw error;
        }
    };
}
const act = withGlobalActEnvironment(domAct);
exports.default = act;
