const config = {
    // 异步包装函数
    asyncWrapper: cb => cb(),
    eventWrapper: cb => cb(),
    advanceTimersWrapper: cb => cb()
};
export function configure(newConfig) {
    Object.assign(config, newConfig);
}
export function getEnv() {
    return process.env.TARO_ENV_JEST || 'h5';
}
export default config;
