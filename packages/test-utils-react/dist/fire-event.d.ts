declare const fireEvent: {
    (...args: any[]): any;
    mouseEnter(...args: any[]): any;
    mouseLeave(...args: any[]): any;
    pointerEnter(...args: any[]): any;
    pointerLeave(...args: any[]): any;
    select(node: any, init: any): void;
    blur(...args: any[]): any;
    focus(...args: any[]): any;
};
export { fireEvent };
