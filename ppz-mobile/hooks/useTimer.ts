import { useState, useEffect } from 'react';

export const useTimer = (seconds: number) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (elapsedTime < seconds) {
      const timer = setTimeout(() => setElapsedTime(elapsedTime + 1), 1000)
      return () => clearTimeout(timer);
    }
  });

  return elapsedTime;
}