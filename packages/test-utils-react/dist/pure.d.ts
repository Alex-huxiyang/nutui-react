import act from './act-compat';
import { fireEvent } from './fire-event';
declare function render(ui: any, params: {
    container?: Element;
    baseElement?: Element;
}): {
    container: Element;
    baseElement: Element;
    unmount: () => void;
    rerender: (rerenderUi: any) => void;
};
export * from '@tarojs/test-utils-dom';
export { render, act, fireEvent };
