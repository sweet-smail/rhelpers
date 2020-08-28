"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsync = void 0;
var react_1 = require("react");
/**
 * @deprecated 异步hooks
 * @param asyncFunction 需要异步执行得函数
 * @param immediate 是否立即执行
 */
exports.useAsync = function (asyncFunction, defaultValue, immediate) {
    if (immediate === void 0) { immediate = true; }
    var _a = react_1.useState('idle'), status = _a[0], setStatus = _a[1];
    var _b = react_1.useState(defaultValue || null), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    var execute = react_1.useCallback(function () {
        setError(null);
        setStatus('pending');
        setValue(null);
        return asyncFunction()
            .then(function (response) {
            setValue(response);
            setStatus('success');
        })
            .catch(function (error) {
            setError(error);
            setStatus('error');
        });
    }, [asyncFunction]);
    react_1.useEffect(function () {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    return { execute: execute, status: status, value: value, error: error };
};
