/**
 * @deprecated 异步hooks
 * @param asyncFunction 需要异步执行得函数
 * @param immediate 是否立即执行
 */
export declare const useAsync: <T, E = string>(asyncFunction: () => Promise<T>, defaultValue?: any, immediate?: boolean) => {
    execute: () => Promise<void>;
    status: "error" | "idle" | "pending" | "success";
    value: T | null;
    error: E | null;
};
