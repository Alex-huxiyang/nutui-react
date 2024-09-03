import stacks from '@tarojs/router/dist/router/stack';
const appProxies = {};
export function proxyAppLifeCycle(app) {
    const lifeCyclies = ['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound', 'onUnhandledRejection'];
    lifeCyclies.forEach((lifecycle) => {
        const originLifeCycle = app[lifecycle];
        appProxies[lifecycle] = new Promise((resolve) => {
            app[lifecycle] = (...args) => {
                if (typeof originLifeCycle === 'function') {
                    originLifeCycle.apply(app, args);
                }
                // 触发生命周期
                resolve(...args);
            };
        });
    });
}
// 入口级别
export const app = {
    onLaunch() {
        return appProxies['onLaunch'];
    },
    onShow() {
        return appProxies['onShow'];
    },
    onHide() {
        return appProxies['onHide'];
    },
    onError() {
        return appProxies['onError'];
    },
    onPageNotFound() {
        return appProxies['onPageNotFound'];
    },
    onUnhandledRejection() {
        return appProxies['onUnhandledRejection'];
    }
};
const pages = [];
// 劫持stack.push
const oldStrackPush = stacks.push;
stacks.push = (page) => {
    pages.push(page);
    const oldOnLoad = page.onLoad;
    page.onLoad = (params, cb) => {
        const callback = () => {
            proxyPageLifeCycle(page);
            cb === null || cb === void 0 ? void 0 : cb();
        };
        return oldOnLoad === null || oldOnLoad === void 0 ? void 0 : oldOnLoad.call(page, params, callback);
    };
    return oldStrackPush.call(stacks, page);
};
const PAGE_LIFECYCLE = ['onLoad', 'onUnload', 'onShow', 'onHide', 'onReady', 'onOptionMenuClick', 'onPopMenuClick', 'onPullDownRefresh', 'onPullIntercept', 'onReachBottom', 'onResize', 'onShareAppMessage', 'onTabItemTap', 'onTitleClick'];
function proxyPageLifeCycle(page) {
    var _a;
    // 拿到path
    const pagePath = ((_a = page.path) === null || _a === void 0 ? void 0 : _a.split('?')[0]) || '';
    getPageLifeCyclies(pagePath);
    const resolves = pageResolves.get(pagePath);
    PAGE_LIFECYCLE.forEach((lifecycle) => {
        // onLoad特殊处理
        if (lifecycle === 'onLoad') {
            resolves[lifecycle]();
            return;
        }
        const originLifeCycle = page[lifecycle];
        page[lifecycle] = (...args) => {
            if (typeof originLifeCycle === 'function') {
                originLifeCycle.apply(page, args);
            }
            // 触发promise
            resolves[lifecycle]();
        };
    });
}
const pageLifeCyclies = new Map();
const pageResolves = new Map();
function createPageLifeCycle(path) {
    const lifeCyclies = {};
    PAGE_LIFECYCLE.forEach((lifecycle) => {
        lifeCyclies[lifecycle] = new Promise((resolve) => {
            const resolies = getPageResolves(path);
            resolies[lifecycle] = resolve;
            pageResolves.set(path, resolies);
        });
    });
    return lifeCyclies;
}
function getPageResolves(path) {
    if (!pageResolves.has(path)) {
        pageResolves.set(path, {});
    }
    return pageResolves.get(path);
}
function getPageLifeCyclies(path) {
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    if (!pageLifeCyclies.has(path)) {
        // 创建一个新的
        pageLifeCyclies.set(path, createPageLifeCycle(path));
    }
    return pageLifeCyclies.get(path);
}
function getPage(path) {
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    const pagePath = path.split('?')[0];
    return pages.find((page) => { var _a; return (_a = page.path) === null || _a === void 0 ? void 0 : _a.startsWith(pagePath); });
}
// page级别
export const page = {
    onLoad(path) {
        return getPageLifeCyclies(path)['onLoad'];
    },
    onUnload(path) {
        return getPageLifeCyclies(path)['onUnload'];
    },
    onShow(path) {
        return getPageLifeCyclies(path)['onShow'];
    },
    onHide(path) {
        return getPageLifeCyclies(path)['onHide'];
    },
    onReady(path) {
        return getPageLifeCyclies(path)['onReady'];
    },
    onPullDownRefresh(path) {
        return getPageLifeCyclies(path)['onPullDownRefresh'];
    },
    triggerPullDownRefresh(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onPullDownRefresh) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onReachBottom(path) {
        return getPageLifeCyclies(path)['onReachBottom'];
    },
    triggerReachBottom(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onReachBottom) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onPageScroll(path) {
        return getPageLifeCyclies(path)['onPageScroll'];
    },
    triggerPageScroll(path, opt) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onPageScroll) === null || _b === void 0 ? void 0 : _b.call(_a, opt);
    },
    onAddToFavorites(path) {
        return getPageLifeCyclies(path)['onAddToFavorites'];
    },
    triggerAddToFavorites(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onAddToFavorites) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onShareAppMessage(path) {
        return getPageLifeCyclies(path)['onShareAppMessage'];
    },
    triggerShareAppMessage(path, opt) {
        var _a, _b;
        // @ts-ignore
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onShareAppMessage) === null || _b === void 0 ? void 0 : _b.call(_a, opt);
    },
    onShareTimeline(path) {
        return getPageLifeCyclies(path)['onShareTimeline'];
    },
    triggerShareTimeline(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onShareTimeline) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onResize(path) {
        return getPageLifeCyclies(path)['onResize'];
    },
    triggerResize(path, opt) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onResize) === null || _b === void 0 ? void 0 : _b.call(_a, opt);
    },
    onTabItemTap(path) {
        return getPageLifeCyclies(path)['onTabItemTap'];
    },
    triggerTabItemTap(path, opt) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onTabItemTap) === null || _b === void 0 ? void 0 : _b.call(_a, opt);
    },
    onSaveExitState(path) {
        return getPageLifeCyclies(path)['onSaveExitState'];
    },
    triggerSaveExitState(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onSaveExitState) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onTitleClick(path) {
        return getPageLifeCyclies(path)['onTitleClick'];
    },
    triggerTitleClick(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onTitleClick) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onOptionMenuClick(path) {
        return getPageLifeCyclies(path)['onOptionMenuClick'];
    },
    triggerOptionMenuClick(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onOptionMenuClick) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onPopMenuClick(path) {
        return getPageLifeCyclies(path)['onPopMenuClick'];
    },
    triggerPopMenuClick(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onPopMenuClick) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    onPullIntercept(path) {
        return getPageLifeCyclies(path)['onPullIntercept'];
    },
    triggerPullIntercept(path) {
        var _a, _b;
        (_b = (_a = getPage(path)) === null || _a === void 0 ? void 0 : _a.onPullIntercept) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
};
