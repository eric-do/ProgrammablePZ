import {
  useEffect,
  useCallback,
  useRef
} from 'react';

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export const useTimeout = (fn: Function, ms: number = 0): UseTimeoutFnReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms])

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    callback.current = fn
  }, [fn]);

  useEffect(() => {
    set();

    return clear;
  }, [ms, set, clear]);

  return [isReady, clear, set];
}