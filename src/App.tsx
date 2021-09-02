import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  useDisclosure
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { Intervals } from "features/intervals";
import { Timer } from "features/timer";
import { Interval } from "features/intervals/types";
import { Workout } from "types";

const defaultWorkout = {
  intervals: [],
  timeInSeconds: 0
}

export const App = () => {
  const [workout, setWorkout] = React.useState<Workout>(defaultWorkout);
  const [displayTimer, setDisplayTimer] = React.useState<boolean>(false);

  const startWorkout = (workout: Workout) => {
    setDisplayTimer(true);
    setWorkout(workout)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            { !displayTimer && <Intervals startWorkout={startWorkout}/> }
            { displayTimer && <Timer workout={workout} />}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}