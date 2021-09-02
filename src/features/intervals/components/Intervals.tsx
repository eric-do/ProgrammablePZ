import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Text,
  Stack
} from "@chakra-ui/react"
import { useDisclosure, Box } from "@chakra-ui/react"
import { Interval } from '../types';
import { ZoneModal } from './ZoneModal';

export const Intervals = () => {
  const [intervals, setIntervals] = React.useState<Interval[]>([]);
  const [totalTime, setTotalTime] = React.useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addInterval = (i: Interval) => {
    setIntervals([...intervals, i])
  };

  useEffect(() => {
    setTotalTime(intervals.reduce((total, interval) => total + interval.length, 0))
  }, [intervals])

  const timeInMS = totalTime * 60 * 1000;
  const minutes = Math.floor(totalTime / 60)
  const seconds = (totalTime % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  return (
    <Box>
      <Stack direction="column" spacing={4}>
        { intervals.length === 0 && <Text>No intervals set</Text>}
        <Button
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Zone
        </Button>
        <Text>{`Total time`}</Text>
        <Text>{`${minutes}:${seconds}`}</Text>
        <Button
          colorScheme="blue"
          isDisabled={intervals.length === 0}
        >
          Start!
        </Button>
        <ZoneModal
          isOpen={isOpen}
          onClose={onClose}
          addInterval={addInterval}
        />
      </Stack>
    </Box>
  )
}