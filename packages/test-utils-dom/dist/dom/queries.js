import { getNodeText } from "./helpers";
import { waitFor } from "./waitFor";
export class Queries {
    constructor() {
        this._container = document;
    }
    setContainer(container) {
        this._container = container;
    }
    querySelector(selectors) {
        return this._container.querySelector(selectors);
    }
    querySelectorAll(selectors) {
        return this._container.querySelectorAll(selectors);
    }
    waitForQuerySelector(selectors, params) {
        return buildWaitFor((resolve, reject) => {
            const dom = this._container.querySelector(selectors);
            dom ? resolve(dom) : reject(`waitForQuerySelector: ${selectors} not found!!`);
        }, params);
    }
    waitForQuerySelectorAll(selectors, params) {
        return buildWaitFor((resolve, reject) => {
            const doms = this._container.querySelectorAll(selectors);
            doms.length ? resolve(doms) : reject(`waitForQuerySelectorAll: ${selectors} not found!!`);
        }, params);
    }
    // text
    queryByText(text, selector = '*') {
        return this.queryAllByText(text, selector)[0] || null;
    }
    queryAllByText(text, selector = '*') {
        return [...Array.from(this._container.querySelectorAll(selector))].filter(node => {
            return getNodeText(node).indexOf(text) >= 0;
        });
    }
    waitForQueryByText(text, selector = '*', params) {
        return buildWaitFor((resolve, reject) => {
            const dom = this.queryByText(text, selector);
            dom ? resolve(dom) : reject(`waitForQueryByText: ${text} not found!!`);
        }, params);
    }
    waitForQueryAllByText(text, selector = '*', params) {
        return buildWaitFor((resolve, reject) => {
            const doms = this.queryAllByText(text, selector);
            doms.length ? resolve(doms) : reject(`waitForQueryAllByText: ${text} not found!!`);
        }, params);
    }
    // attributes
    queryByAttribute(attr, value) {
        return this.querySelector(`[${attr}='${value}']`);
    }
    queryAllByAttribute(attr, value) {
        return this.querySelectorAll(`['${attr}='${value}']`);
    }
    waitForQueryByAttribute(attr, value, params) {
        return buildWaitFor((resolve, reject) => {
            const dom = this.queryByAttribute(attr, value);
            dom ? resolve(dom) : reject(`waitForQueryByAttribute: ${attr} not found!!`);
        }, params);
    }
    waitForQueryAllByAttribute(attr, value, params) {
        return buildWaitFor((resolve, reject) => {
            const doms = this.queryAllByAttribute(attr, value);
            doms.length ? resolve(doms) : reject(`waitForQueryByAttribute: ${attr} not found!!`);
        }, params);
    }
    // placeholder
    queryByPlaceholder(text) {
        return this.queryByAttribute('placeholder', text);
    }
    queryAllByPlaceholder(text) {
        return this.queryAllByAttribute('placeholder', text);
    }
    waitForQueryByPlaceholder(text, params) {
        return buildWaitFor((resolve, reject) => {
            const dom = this.queryByPlaceholder(text);
            dom ? resolve(dom) : reject(`waitForQueryByPlaceholder: ${text} not found!!`);
        }, params);
    }
    waitForQueryAllByPlaceholder(text, params) {
        return buildWaitFor((resolve, reject) => {
            const doms = this.queryAllByPlaceholder(text);
            doms.length ? resolve(doms) : reject(`waitForQueryByPlaceholder: ${text} not found!!`);
        }, params);
    }
}
export const queries = new Queries();
function buildWaitFor(cb, params) {
    return waitFor(() => {
        return new Promise((resolve, reject) => {
            cb(resolve, reject);
        });
    }, params);
}
