import { useState, useCallback, useEffect } from 'react';
/**
 * @deprecated 异步hooks
 * @param asyncFunction 需要异步执行得函数
 * @param immediate 是否立即执行
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  defaultValue?: any,
  immediate = true
) => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [value, setValue] = useState<T | null>(defaultValue || null);
  const [error, setError] = useState<E | null>(null);
  const execute = useCallback(() => {
    setError(null);
    setStatus('pending');
    setValue(null);
    return asyncFunction()
      .then((response: any) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};
