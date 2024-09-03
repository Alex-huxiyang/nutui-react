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
import * as prettyFormat from 'pretty-format';
import createDOMElementFilter from './DOMElementFilter';
import { getEnv } from '../config';
const defaultIgnore = 'script, style';
const shouldHighlight = () => {
    var _a;
    let colors;
    try {
        colors = JSON.parse(((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.COLORS) || '');
    }
    catch (e) {
        // If this throws, process?.env?.COLORS wasn't parsable. Since we only
        // care about `true` or `false`, we can safely ignore the error.
    }
    if (typeof colors === 'boolean') {
        // If `colors` is set explicitly (both `true` and `false`), use that value.
        return colors;
    }
    else {
        // If `colors` is not set, colorize if we're in node.
        return (typeof process !== 'undefined' &&
            process.versions !== undefined &&
            process.versions.node !== undefined);
    }
};
const { DOMCollection } = prettyFormat.plugins;
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
const ELEMENT_NODE = 1;
const COMMENT_NODE = 8;
// https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50
function filterCommentsAndDefaultIgnoreTagsTags(value) {
    var _a;
    // 过滤空文本节点
    if (value.nodeType === Node.TEXT_NODE && ((_a = value.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === '')
        return false;
    return (value.nodeType !== COMMENT_NODE &&
        (value.nodeType !== ELEMENT_NODE || !value.matches(defaultIgnore)));
}
function prettyDOM(dom, maxLength, options = {}) {
    if (!dom) {
        dom = document.body;
    }
    if (typeof maxLength !== 'number') {
        maxLength =
            (typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT) || 7000;
    }
    if (maxLength === 0) {
        return '';
    }
    if (dom.documentElement) {
        dom = dom.documentElement;
    }
    let domTypeName = typeof dom;
    if (domTypeName === 'object') {
        domTypeName = dom.constructor.name;
    }
    else {
        // To don't fall with `in` operator
        dom = {};
    }
    if (!('outerHTML' in dom)) {
        throw new TypeError(`Expected an element or document but got ${domTypeName}`);
    }
    const { 
    // @ts-ignore
    filterNode = filterCommentsAndDefaultIgnoreTagsTags, filterPrint = filterTaroPrint, changeOpenTag = changeTaroOpenTag } = options, prettyFormatOptions = __rest(options, ["filterNode", "filterPrint", "changeOpenTag"]);
    const debugContent = prettyFormat.format(dom, Object.assign({ plugins: [createDOMElementFilter({ filterNode, filterPrint, changeOpenTag }), DOMCollection], printFunctionName: false, highlight: shouldHighlight() }, prettyFormatOptions));
    return maxLength !== undefined && dom.outerHTML.length > maxLength
        ? `${debugContent.slice(0, maxLength)}...`
        : debugContent;
}
function filterTaroPrint(ele) {
    const TARO_JEST_ENV = getEnv();
    if (TARO_JEST_ENV !== 'h5') {
        // 小程序
        if (/^(taro)-(.)*-(core)$/i.test(ele.tagName)) {
            return true;
        }
        return false;
    }
    else {
        // h5
        return true;
    }
}
function changeTaroOpenTag(type) {
    const TARO_JEST_ENV = getEnv();
    if (TARO_JEST_ENV !== 'h5') {
        return type.replace(/^(taro-)(.*)(-core)$/, '$2');
    }
    else {
        return type;
    }
}
export { prettyDOM, prettyFormat };
