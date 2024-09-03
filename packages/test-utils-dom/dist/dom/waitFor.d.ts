export type TWaitforParams = {
    container?: HTMLElement | Document;
    timeout?: number;
    interval?: number;
    mutationObserverOptions?: MutationObserverInit;
};
declare function waitForWrapper(callback: any, options?: TWaitforParams): any;
export { waitForWrapper as waitFor };
