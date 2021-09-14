
import {
  Heading,
  Text,
  Progress,
  Stack,
  Box,
  Button
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { zoneColors, inactiveZoneColors, zoneColorSchemes } from 'shared';
import { useRide } from 'providers/RideProvider';
import { useIncrementRideCount } from 'features/rides/api/incrementRideCount';

interface TimerProps {
  displayTimer: (b: boolean) => void;
};

const defaultProps = {
  displayTimer: () => {}
}


export const Timer = ({ displayTimer }: TimerProps = defaultProps) => {
  const { ride } = useRide();
  const { mutate: incrementRide} = useIncrementRideCount({ rideId: ride.id});
  let { intervals, timeInSeconds } = ride;

  // Global countdown states
  timeInSeconds -= 1;
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
  const tempSeconds = Math.floor(zoneTimeInSeconds % 60);
  const tempMinutes = Math.floor(zoneTimeInSeconds / 60);
  const [zoneMinutes, setZoneMinutes] = useState<number>(tempSeconds === 0 ? tempMinutes - 1 : tempMinutes);
  const [zoneSeconds, setZoneSeconds] = useState<number>(tempSeconds === 0 ? 59 : tempSeconds - 1);
  const formattedZoneSeconds = zoneSeconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  useEffect(() => {
    if (ride.id) {
      incrementRide({ data: { rideId: ride.id }})
    }
  }, [incrementRide, ride.id])

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
          const tempSeconds = Math.floor(intervals[nextInterval].length % 60);
          const tempMinutes = Math.floor(intervals[nextInterval].length / 60);
          setZoneMinutes(tempSeconds === 0 ? tempMinutes - 1 : tempMinutes)
          setZoneSeconds(tempSeconds === 0 ? 59 : tempSeconds - 1)
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
        <Heading as="h1" size="xl">
          Zone {intervals[zoneInterval]?.zone}
        </Heading>
        <Stack
          direction="column"
          spacing={2}
          data-testid="zone-timer"
        >
          <Progress
            colorScheme={intervals[zoneInterval]?.length - zoneElapsedTime < 5
                         ? "red"
                         : zoneColorSchemes[intervals[zoneInterval]?.zone]}
            hasStripe
            size="lg"
            value={(zoneElapsedTime / zoneTimeInSeconds) * 100}
          />
          <Text>{zoneMinutes}:{formattedZoneSeconds}</Text>
        </Stack>

        <Stack
          direction="column"
          spacing={1}
          data-testid="ride-timer"
        >
          <Stack
            direction="row"
            spacing={0.5}
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
                    ? zoneColors[interval.zone]
                        : inactiveZoneColors[interval.zone]}
                  h={`${(interval.zone) / 7 * 100}%`}
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
          colorScheme="yellow"
          onClick={() => displayTimer(false)}
        >
          Go back
        </Button>
      </Stack>
    </Box>
  )
};