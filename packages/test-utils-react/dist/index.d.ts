import { AppInstance, PageInstance } from '@tarojs/runtime';
import { Queries } from '@tarojs/test-utils-dom';
import { app as AppLifecycle, page as PageLifecycle } from '@tarojs/test-utils-shared';
import type { FunctionComponent, ComponentClass } from 'react';
import type { FireEvent } from '@tarojs/test-utils-dom';
type TRenderParams<T> = {
    props?: T;
    container?: HTMLElement;
    baseElement?: HTMLElement;
};
declare class ReactTestUtil {
    private _inst;
    mount<T extends Record<any, any>>(ui: FunctionComponent<T> | ComponentClass<T>, params?: TRenderParams<T>): Promise<void>;
    unmout(): void;
    fireEvent: FireEvent;
    queries: Queries;
    act: (callback: any) => any;
    AppLifecycle: typeof AppLifecycle;
    PageLifecycle: typeof PageLifecycle;
    createApp(): Promise<{
        app: AppInstance;
        page: PageInstance;
    }>;
    html(): string;
}
export default ReactTestUtil;
