import { useState, useEffect } from 'react';

/**
 * @description 获取浏览器窗口大小
 * @example
 * const size=useWindowResize()
 * const App=()=>{
 *   return <div>{size.width} / {size.height} px</div>
 * }
 */
export const useWindowResize = (callBack?: () => void) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerWidth,
  });
  useEffect(() => {
    const handleResize = () => {
      callBack && callBack();
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callBack]);
  return windowSize;
};

/**
 * @description 动态导入script 标签，返回加载状态
 * @param src 需要导入的script url地址(不会验证地址的完整性)
 */
export const useScript = (src: string) => {
  type statusTypes = 'idle' | 'loading' | 'error';
  const [status, setStatus] = useState<statusTypes>('idle');
  useEffect(() => {
    if (!src) {
      //设置当前状态为空闲状态
      setStatus('idle');
      return;
    }
    //判断当前url地址是否已经加载
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      //创建script 标签
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);
    } else {
      setStatus((script.getAttribute('data-status') as statusTypes) || 'idle');
    }
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'idle' : 'error');
    };
    //对script 标签 监听事件，更改状态
    (script as Element).addEventListener('load', setStateFromEvent);
    (script as Element).addEventListener('error', setStateFromEvent);
    //清除事件
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);
  return status;
};
