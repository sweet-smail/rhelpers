/**
 * @description 获取浏览器窗口大小
 * @example
 * const size=useWindowResize()
 * const App=()=>{
 *   return <div>{size.width} / {size.height} px</div>
 * }
 */
export declare const useWindowResize: (callBack?: (() => void) | undefined) => {
    width: number;
    height: number;
};
/**
 * @description 动态导入script 标签，返回加载状态
 * @param src 需要导入的script url地址(不会验证地址的完整性)
 */
export declare const useScript: (src: string) => "error" | "idle" | "loading";
