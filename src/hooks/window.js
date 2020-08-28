"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScript = exports.useWindowResize = void 0;
var react_1 = require("react");
/**
 * @description 获取浏览器窗口大小
 * @example
 * const size=useWindowResize()
 * const App=()=>{
 *   return <div>{size.width} / {size.height} px</div>
 * }
 */
exports.useWindowResize = function (callBack) {
    var _a = react_1.useState({
        width: window.innerWidth,
        height: window.innerWidth,
    }), windowSize = _a[0], setWindowSize = _a[1];
    react_1.useEffect(function () {
        var handleResize = function () {
            callBack && callBack();
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, [callBack]);
    return windowSize;
};
/**
 * @description 动态导入script 标签，返回加载状态
 * @param src 需要导入的script url地址(不会验证地址的完整性)
 */
exports.useScript = function (src) {
    var _a = react_1.useState('idle'), status = _a[0], setStatus = _a[1];
    react_1.useEffect(function () {
        if (!src) {
            //设置当前状态为空闲状态
            setStatus('idle');
            return;
        }
        //判断当前url地址是否已经加载
        var script = document.querySelector("script[src=\"" + src + "\"]");
        if (!script) {
            //创建script 标签
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            script_1.setAttribute('data-status', 'loading');
            document.body.appendChild(script_1);
        }
        else {
            setStatus(script.getAttribute('data-status') || 'idle');
        }
        var setStateFromEvent = function (event) {
            setStatus(event.type === 'load' ? 'idle' : 'error');
        };
        //对script 标签 监听事件，更改状态
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
        //清除事件
        return function () {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [src]);
    return status;
};
