declare const _default: {
    bail: number;
    verbose: boolean;
    testEnvironment: string;
    testEnvironmentOptions: {
        url: string;
        customExportConditions: string[];
    };
    testMatch: string[];
    setupFiles: string[];
    collectCoverageFrom: string[];
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': string;
    };
    transformIgnorePatterns: never[];
    moduleFileExtensions: string[];
    moduleNameMapper: {
        '@tarojs/taro$': string;
        '@tarojs/components$': string;
    };
    globals: {
        ENABLE_INNER_HTML: boolean;
        ENABLE_ADJACENT_HTML: boolean;
        ENABLE_SIZE_APIS: boolean;
        DEPRECATED_ADAPTER_COMPONENT: boolean;
        ENABLE_TEMPLATE_CONTENT: boolean;
        ENABLE_MUTATION_OBSERVER: boolean;
        ENABLE_CLONE_NODE: boolean;
        ENABLE_CONTAINS: boolean;
        __TARO_FRAMEWORK__: string;
        'ts-jest': {
            diagnostics: boolean;
            tsconfig: {
                jsx: string;
                allowJs: boolean;
                target: string;
            };
        };
        'babel-jest': {
            presets: (string | (string | {
                modules: string;
            })[])[];
        };
    };
};
export default _default;
