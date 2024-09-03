import { TWaitforParams } from "./waitFor";
export declare class Queries {
    private _container;
    setContainer(container: any): void;
    querySelector(selectors: string): Element | null;
    querySelectorAll(selectors: string): NodeListOf<Element>;
    waitForQuerySelector(selectors: string, params?: TWaitforParams): any;
    waitForQuerySelectorAll(selectors: string, params?: TWaitforParams): any;
    queryByText(text: string, selector?: string): Element;
    queryAllByText(text: string, selector?: string): Element[];
    waitForQueryByText(text: string, selector?: string, params?: TWaitforParams): any;
    waitForQueryAllByText(text: string, selector?: string, params?: TWaitforParams): any;
    queryByAttribute(attr: string, value: any): Element | null;
    queryAllByAttribute(attr: string, value: any): NodeListOf<Element>;
    waitForQueryByAttribute(attr: string, value: any, params?: TWaitforParams): any;
    waitForQueryAllByAttribute(attr: string, value: any, params?: TWaitforParams): any;
    queryByPlaceholder(text: string): Element | null;
    queryAllByPlaceholder(text: string): NodeListOf<Element>;
    waitForQueryByPlaceholder(text: string, params?: TWaitforParams): any;
    waitForQueryAllByPlaceholder(text: string, params?: TWaitforParams): any;
}
export declare const queries: Queries;
