import {
  DependencyList,
  useEffect,
} from 'react';
import { useTimeout } from './useTimeout';

export type UseDebounceReturn = [() => boolean | null, () => void];

export const useDebounce = (
  fn: Function,
  ms: number = 0,
  deps: DependencyList
): UseDebounceReturn => {
  const [isReady, clear, reset] = useTimeout(fn, ms);
  useEffect(reset, [...deps, reset]);
  return [isReady, clear]
}