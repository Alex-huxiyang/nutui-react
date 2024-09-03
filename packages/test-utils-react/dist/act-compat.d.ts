declare function setIsReactActEnvironment(isReactActEnvironment: any): void;
declare function getIsReactActEnvironment(): any;
declare const act: (callback: any) => any;
export default act;
export { setIsReactActEnvironment as setReactActEnvironment, getIsReactActEnvironment, };
