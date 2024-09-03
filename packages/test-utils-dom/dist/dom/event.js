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
import { eventMap, eventAliasMap } from "./event-map";
import config from '../config';
function fireEvent(element, event) {
    return config.eventWrapper(() => {
        return element.dispatchEvent(event);
    });
}
function createEvent(eventName, node, init, { EventType = 'Event', defaultInit = {} } = {}) {
    const eventInit = Object.assign(Object.assign({}, defaultInit), init);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const _a = eventInit.target, _b = _a === void 0 ? {} : _a, { value, files } = _b, targetProperties = __rest(_b, ["value", "files"]);
    if (value !== undefined) {
        setNativeValue(node, value);
    }
    if (files !== undefined) {
        Object.defineProperty(node, 'files', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: files,
        });
    }
    Object.assign(node, targetProperties);
    const EventConstructor = window[EventType] || window.Event;
    let event;
    if (typeof EventConstructor === 'function') {
        event = new EventConstructor(eventName, eventInit);
    }
    else {
        // IE11 polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
        event = window.document.createEvent(EventType);
        const { bubbles, cancelable, detail } = eventInit, otherInit = __rest(eventInit, ["bubbles", "cancelable", "detail"]);
        event.initEvent(eventName, bubbles, cancelable, detail);
        Object.keys(otherInit).forEach(eventKey => {
            event[eventKey] = otherInit[eventKey];
        });
    }
    // DataTransfer is not supported in jsdom: https://github.com/jsdom/jsdom/issues/1568
    const dataTransferProperties = ['dataTransfer', 'clipboardData'];
    dataTransferProperties.forEach(dataTransferKey => {
        const dataTransferValue = eventInit[dataTransferKey];
        if (typeof dataTransferValue === 'object') {
            if (typeof window.DataTransfer === 'function') {
                Object.defineProperty(event, dataTransferKey, {
                    value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => {
                        Object.defineProperty(acc, propName, {
                            value: dataTransferValue[propName],
                        });
                        return acc;
                    }, new window.DataTransfer()),
                });
            }
            else {
                Object.defineProperty(event, dataTransferKey, {
                    value: dataTransferValue,
                });
            }
        }
    });
    return event;
}
Object.keys(eventMap).forEach(key => {
    const { EventType, defaultInit } = eventMap[key];
    const eventName = key.toLowerCase();
    createEvent[key] = (node, init) => createEvent(eventName, node, init, { EventType, defaultInit });
    fireEvent[key] = (node, init) => fireEvent(node, createEvent[key](node, init));
});
// function written after some investigation here:
// https://github.com/facebook/react/issues/10135#issuecomment-401496776
function setNativeValue(element, value) {
    const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {};
    const prototype = Object.getPrototypeOf(element);
    const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {};
    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    }
    else {
        if (valueSetter) {
            valueSetter.call(element, value);
        }
        else {
            throw new Error('The given element does not have a value setter');
        }
    }
}
Object.keys(eventAliasMap).forEach(aliasKey => {
    const key = eventAliasMap[aliasKey];
    fireEvent[aliasKey] = (...args) => fireEvent[key](...args);
});
export { fireEvent, createEvent };
