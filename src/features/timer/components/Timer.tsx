import { Interval } from 'features/intervals/types';
import {
  Heading,
  Text,
  Progress
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { Workout } from 'types'

interface TimerProps {
  workout: Workout
};

const defaultProps = {
  workout: {
    intervals: [],
    timeInSeconds: 0
  }
}

export const Timer = ({ workout }: TimerProps = defaultProps) => {
  const { intervals, timeInSeconds } = workout;
  const timeInMs = timeInSeconds * 1000;
  const [elapsedTime, setElapsedTime] = React.useState<number>(0)
  const [minutes, setMinutes] = React.useState<number>(Math.floor(timeInSeconds / 60));
  const [seconds, setSeconds] = React.useState<number>(timeInSeconds % 60);
  // const [interval, setInterval] = React.useState<number>(0);
  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  useEffect(() => {
    console.log('Using effect')
    let timerCountdown = setInterval(() => {
      console.log('Setting interval')
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerCountdown);
        } else {
          setMinutes(minutes => minutes - 1)
          setSeconds(59)
        }
      }
      setElapsedTime(time => time + 1)
    }, 1000);

    return () => clearInterval(timerCountdown);
  }, [minutes, seconds])

  return (
    <div>
      <Heading as="h1" size="lg">Timer</Heading>
      <Text>{minutes}:{formattedSeconds}</Text>
      <Progress size="lg" value={(elapsedTime / timeInSeconds) * 100}/>
    </div>
  )
};