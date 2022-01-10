import { useState, useEffect } from 'react';

export const useTimer = (timeInSeconds: number) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(Math.ceil(timeInSeconds % 60))
  const [minutes, setMinutes] = useState<number>(Math.ceil(timeInSeconds / 60))

  const updateTime = () => {
    if (minutes === 0 && seconds === 0) {
      // STOP
    } else {
      if (seconds === 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }
    setElapsedTime(elapsedTime + 1);
  }

  useEffect(() => {
    if (elapsedTime < timeInSeconds) {
      const timer = setTimeout(updateTime, 1000)
      return () => clearTimeout(timer);
    }
  });

  return { elapsedTime, minutes, seconds };
}