import { useState, useEffect, useCallback } from 'react';

export const useTimer = (timeInSeconds: number) => {
  timeInSeconds -= 1
  const [elapsedTime, setElapsedTime] = useState<number>(1)
  const [minutes, setMinutes] = useState<number>(Math.floor(timeInSeconds / 60));
  const [seconds, setSeconds] = useState<number>(timeInSeconds % 60);

  const decrementMinutes = useCallback(() => setMinutes(minutes => minutes - 1), []);
  const decrementSeconds = useCallback(() => setSeconds(seconds => seconds - 1), []);

  useEffect(() => {
    let timerCountdown = setInterval(() => {
      if (seconds > 0) {
        decrementSeconds();
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerCountdown)
        } else {
          decrementMinutes()
          setSeconds(59)
        }
      }
      setElapsedTime(seconds => seconds + 1)
    }, 1000);

    return () => {
      clearInterval(timerCountdown);
    };
  }, [minutes, seconds, decrementMinutes, decrementSeconds])

  return { minutes, seconds, elapsedTime }
}