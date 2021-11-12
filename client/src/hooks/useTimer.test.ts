import { useTimer } from './useTimer'
import { renderHook } from '@testing-library/react-hooks'

jest.spyOn(global, 'setInterval');

beforeEach(() => {
  jest.useFakeTimers();
})

afterEach(() => {
  jest.useRealTimers();
});

xtest('waits 5 seconds before concluding timer', () => {
  const { result } = renderHook(() => useTimer(5));

  jest.advanceTimersByTime(6000);
  expect(setInterval).toHaveBeenCalledTimes(6);
})