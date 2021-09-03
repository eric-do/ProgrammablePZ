import React, { useEffect } from 'react';
import {
  Button,
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { useDisclosure, Box } from "@chakra-ui/react"
import { Interval } from '../types';
import { ZoneModal } from './ZoneModal';
import { Workout } from 'types';

interface Props {
  startWorkout: (workout: Workout) => void;
}

export const Intervals = ({ startWorkout }: Props ) => {
  const [intervals, setIntervals] = React.useState<Interval[]>([]);
  const [totalTime, setTotalTime] = React.useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addInterval = (i: Interval) => {
    setIntervals([...intervals, i])
  };

  const setWorkout = () => {
    startWorkout({
      intervals,
      timeInSeconds: totalTime
    })
  }

  useEffect(() => {
    setTotalTime(intervals.reduce((total, interval) => total + interval.length, 0))
  }, [intervals])

  const minutes = Math.floor(totalTime / 60)
  const seconds = (totalTime % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  return (
    <Box>
      <Stack direction="column" spacing={4}>
        <Heading as="h1" size="lg">Intervals</Heading>
        { intervals.length === 0 && <Text>No intervals set</Text>}
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>Interval</Th>
              <Th>Zone</Th>
              <Th>Length</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              intervals.map((interval, index) => {
                const minutes = Math.floor(interval.length / 60)
                const seconds = (interval.length % 60).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                });

                return (
                  <Tr key={index}>
                    <Td>{index}</Td>
                    <Td>{interval.zone}</Td>
                    <Td>{minutes}:{seconds}</Td>
                  </Tr>
                )
                })
            }
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Text fontSize="lg">
                  Total time
                </Text>
              </Th>
              <Th></Th>
              <Th>
                <Text fontSize="lg">
                  {minutes}:{seconds}
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
        <Button
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Zone
        </Button>
        <Button
          colorScheme="green"
          isDisabled={intervals.length === 0}
          onClick={setWorkout}
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