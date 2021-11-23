import {
  DependencyList,
  useState,
  useEffect,
} from 'react';
import { useTimeout } from './useTimeout';

export type UseDebounceReturn = [() => boolean | null, () => void];

export const useDebounce = (
  value: number | string,
  delay: number = 0,
): number | string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return (() => clearTimeout(handler));
  }, [value, delay]);

  return debouncedValue;
}