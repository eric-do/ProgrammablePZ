import React, { useState, useEffect} from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Intervals } from "features/intervals";
import { Timer } from "features/timer";
import { Interval } from "types";
import theme from 'theme';

export const App = () => {
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

  useEffect(() => {
    setTimeInSeconds(intervals.reduce((total, interval) => total + interval.length, 0))
  }, [intervals])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            { !displayTimer && <Intervals
                                  intervals={intervals}
                                  addInterval={addInterval}
                                  resetIntervals={resetIntervals}
                                  startWorkout={startWorkout}
                                  time={time}
                                /> }
            { displayTimer && <Timer workout={workout} displayTimer={setDisplayTimer}/>}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}