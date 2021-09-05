import React, { useState, useEffect} from "react";
import {
  VStack,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { Intervals } from "features/timer";
import { Timer } from "features/timer";
import { Interval, Workout } from "types";
import { SuggestionsModal } from "./SuggestionsModal";

export const ZoneTimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [displayTimer, setDisplayTimer] = useState<boolean>(false);
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60;
  const time = { minutes, seconds, timeInSeconds }
  const workout = { intervals, timeInSeconds }

  const startWorkout = () => setDisplayTimer(true);
  const addInterval = (interval: Interval) => setIntervals([...intervals, interval])
  const resetIntervals = () => setIntervals([]);
  const setWorkout = (w: Workout) => {
    const { intervals, timeInSeconds } = w;
    setIntervals([...intervals])
    setTimeInSeconds(timeInSeconds)
  }

  useEffect(() => {
    setTimeInSeconds(intervals.reduce((total, interval) => total + interval.length, 0))
  }, [intervals])

  return (
    <VStack spacing={8}>
      { !displayTimer &&
        <>
          <Intervals
            intervals={intervals}
            addInterval={addInterval}
            resetIntervals={resetIntervals}
            startWorkout={startWorkout}
            time={time}
          />
          <Link
            role="link"
            color="teal.500"
            fontSize="sm"
            onClick={onOpen}
          >
            Need a suggestion?
          </Link>
          <SuggestionsModal
            isOpen={isOpen}
            onClose={onClose}
            setWorkout={setWorkout}
          />
        </>
      }
      { displayTimer && <Timer workout={workout} displayTimer={setDisplayTimer}/>}

    </VStack>
  );
}