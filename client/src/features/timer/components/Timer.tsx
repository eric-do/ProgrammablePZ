
import {
  Box,
  Button,
  Heading,
  Progress,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { useAuth } from "lib/auth";
import { zoneColors, inactiveZoneColors, zoneColorSchemes } from 'shared';
import { useRide } from 'providers/RideProvider';
import { useSound } from "providers/SoundProvider";
import { useIncrementRideCount } from 'features/rides/api/incrementRideCount';
import { useRidesTakenByUser } from "features/rides/api";
import { FinishRideModal } from './FinishRideModal';

interface TimerProps {
  displayTimer: (b: boolean) => void;
};

const defaultProps = {
  displayTimer: () => {}
}

export const Timer = ({ displayTimer }: TimerProps = defaultProps) => {
  const { user } = useAuth();
  const {
    isOpen: isOpenFinishRide,
    onOpen: onOpenFinishRide,
    onClose: onCloseFinishRide
  } = useDisclosure();
  const toast = useToast();
  const { active: soundActive, sounds: { bell } } = useSound();
  const { ride } = useRide();
  const { mutate: incrementRide} = useIncrementRideCount({
    rideId: ride.id
  });
  const { mutate: addUserRide } = useRidesTakenByUser({
    rideId: ride.id,
    userId: user?.id
  })
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

  const toggleFinishRideModal = () => {
    if (user) {
      onOpenFinishRide();
    } else {
      toast({
        title: "You must be logged to do that",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (ride.id) {
      incrementRide({ data: { rideId: ride.id }})
    }
    if (user && ride) {
      console.log(user, ride)
      addUserRide({ data: {
        rideId: ride.id,
        userId: user.id
      }})
    }
  }, [addUserRide, incrementRide, ride, user])

  useEffect(() => {
    if (elapsedTime === timeInSeconds) {
      setZoneElapsedTime(zoneTimeInSeconds);
      toast({
        title: "Ride complete!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      return;
    }

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
        if (zoneMinutes === 0 && zoneInterval < intervals.length - 1) {
          if (soundActive) bell.play();
          const nextInterval = zoneInterval + 1
          setZoneInterval(nextInterval)
          const tempSeconds = Math.floor(intervals[nextInterval].length % 60);
          const tempMinutes = Math.floor(intervals[nextInterval].length / 60);
          setZoneMinutes(tempSeconds === 0 ? tempMinutes - 1 : tempMinutes)
          setZoneSeconds(tempSeconds === 0 ? 59 : tempSeconds - 1)
          setZoneElapsedTime(0)
        } else {
          setZoneSeconds(59)
          setZoneMinutes(minutes => minutes - 1)
        }
      }
      setElapsedTime(seconds => seconds + 1)
      setZoneElapsedTime(seconds => seconds + 1)
    }, 1000);

    return () => {
      clearInterval(timerCountdown);
    };
  }, [
    intervals, minutes, seconds, zoneInterval, zoneTimeInSeconds,
    zoneSeconds, zoneMinutes, toast, elapsedTime, timeInSeconds, bell, soundActive
  ])

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
            colorScheme={
              intervals[zoneInterval]?.length - zoneElapsedTime < 5
              ? "red"
              : zoneColorSchemes[intervals[zoneInterval]?.zone]
            }
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
                <Tooltip
                  label={`Zone ${interval.zone}`}
                  key={index}
                >
                  <Box
                    bg={index <= zoneInterval
                      ? zoneColors[interval.zone]
                          : inactiveZoneColors[interval.zone]}
                    h={`${(interval.zone) / 7 * 100}%`}
                    w={`${((interval.length) / timeInSeconds) * 100}%`}
                  />
                </Tooltip>
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
        {
          ride.id &&
          <Button
            colorScheme="blue"
            onClick={toggleFinishRideModal}
          >
            Rate ride
          </Button>
        }
      </Stack>
      <FinishRideModal isOpen={isOpenFinishRide} onClose={onCloseFinishRide} />
    </Box>
  )
};