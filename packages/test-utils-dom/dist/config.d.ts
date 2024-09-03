import { IConfig } from "../types";
declare const config: IConfig;
export declare function configure(newConfig: Partial<IConfig>): void;
export declare function getEnv(): string;
export default config;
