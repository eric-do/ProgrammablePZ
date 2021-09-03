
import {
  Heading,
  Text,
  Progress,
  Stack,
  Box
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

  // Global countdown states
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(Math.floor(timeInSeconds / 60));
  const [seconds, setSeconds] = useState<number>(timeInSeconds % 60);
  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  // Zone countdown states
  const [zoneInterval, setZoneInterval] = useState<number>(0);
  const [zoneElapsedTime, setZoneElapsedTime] = useState<number>(0);
  const zoneTimeInSeconds = intervals[zoneInterval]?.length;
  const [zoneMinutes, setZoneMinutes] = useState<number>(Math.floor(zoneTimeInSeconds / 60));
  const [zoneSeconds, setZoneSeconds] = useState<number>(Math.floor(zoneTimeInSeconds % 60));
  const formattedZoneSeconds = zoneSeconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  useEffect(() => {
    let timerCountdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerCountdown)
          setStopCount(true)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
      if (zoneSeconds > 0) {
        setZoneSeconds(seconds => seconds - 1)
      }
      if (zoneSeconds === 0) {
        if (zoneInterval < intervals.length - 1) {
          const nextInterval = zoneInterval + 1
          setZoneInterval(nextInterval)
          setZoneMinutes(Math.floor(intervals[zoneInterval].length / 60))
          setZoneSeconds(Math.floor(intervals[zoneInterval].length % 60))
          setZoneElapsedTime(0)
        }
      }
      setElapsedTime(seconds => seconds + 1)
      setZoneElapsedTime(seconds => seconds + 1)

    }, 1000);

    return () => {
      clearInterval(timerCountdown);
    };
  }, [intervals, minutes, seconds, zoneInterval, zoneSeconds])

  return (
    <Box>
      <Stack direction="column" spacing={4}>
        <Heading as="h1" size="lg">Timer</Heading>
        <Heading as="h2" size="md">Zone: {intervals[zoneInterval]?.zone}</Heading>
        <Text>{zoneMinutes}:{formattedZoneSeconds}</Text>
        <Progress colorScheme="green" hasStripe size="lg" value={(zoneElapsedTime / zoneTimeInSeconds) * 100}/>

        <Heading as="h2" size="md">Total time</Heading>
        <Text>{minutes}:{formattedSeconds}</Text>
        <Progress colorScheme="green" hasStripe size="lg" value={(elapsedTime / timeInSeconds) * 100}/>
      </Stack>
    </Box>
  )
};