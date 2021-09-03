
import {
  Heading,
  Text,
  Progress,
  Stack,
  Box,
  Button
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { Workout } from 'types'
import { zoneColors, inactiveZoneColors, zoneColorSchemes } from 'shared';

interface TimerProps {
  workout: Workout;
  displayTimer: (b: boolean) => void;
};

const defaultProps = {
  workout: {
    intervals: [],
    timeInSeconds: 0
  },
  displayTimer: () => {}
}


export const Timer = ({ workout, displayTimer }: TimerProps = defaultProps) => {
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
    <Box w='80%'>
      <Stack direction="column" spacing={7}>
        <Heading as="h1" size="lg">
          Zone {intervals[zoneInterval]?.zone}
        </Heading>
        <Stack direction="column" spacing={2}>
          <Progress
            colorScheme={intervals[zoneInterval]?.length - zoneElapsedTime < 5
                         ? "red"
                         : zoneColorSchemes[parseInt(intervals[zoneInterval]?.zone)]}
            hasStripe
            size="lg"
            value={(zoneElapsedTime / zoneTimeInSeconds) * 100}
          />
          <Text>{zoneMinutes}:{formattedZoneSeconds}</Text>
        </Stack>

        <Stack
          direction="column"
          spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            d="flex"
            align="flex-end"
            h={100}
            data-testid="active-zone-graph"
          >
            {
              intervals.map((interval, index) => (
                <Box
                  key={index}
                  bg={index === zoneInterval
                    ? zoneColors[parseInt(interval.zone)]
                        : inactiveZoneColors[parseInt(interval.zone)]}
                  h={`${(parseInt(interval.zone) / 7) * 100}%`}
                  w={`${((interval.length) / timeInSeconds) * 100}%`}
                />
              ))
            }
          </Stack>
          <Progress
            colorScheme="blue"
            hasStripe
            size="lg"
            value={(elapsedTime / timeInSeconds) * 100}
          />
          <Text>{minutes}:{formattedSeconds}</Text>

        </Stack>
        <Button
          colorScheme="green"
          onClick={() => displayTimer(false)}
        >
          Go back
        </Button>
      </Stack>
    </Box>
  )
};