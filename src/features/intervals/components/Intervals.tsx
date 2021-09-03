import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
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
import { Workout } from 'types'
import { zoneColors } from 'shared';

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
        <Table size="md">
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
                    <Td>
                      <Text fontSize="md">
                        {index}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md">
                        {interval.zone}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md">
                        {minutes}:{seconds}
                      </Text>
                    </Td>
                  </Tr>
                )
                })
            }
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Text fontSize="md">
                  Total time
                </Text>
              </Th>
              <Th></Th>
              <Th>
                <Text fontSize="md">
                  {minutes}:{seconds}
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
        <Stack
          direction="row"
          spacing={1}
          d="flex"
          align="flex-end"
          h={50}
        >
          {
            intervals.map((interval, index) => (
              <Box
                key={index}
                bg={zoneColors[parseInt(interval.zone)]}
                h={`${(parseInt(interval.zone) / 7) * 100}%`}
                w={`${((interval.length) / totalTime) * 100}%`}
              />
            ))
          }
        </Stack>
        <Button
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Zone
        </Button>
        <ButtonGroup spacing={2}>
          <Button
            isFullWidth
            colorScheme="gray"
            isDisabled={intervals.length === 0}
            onClick={() => setIntervals([])}
          >
            Reset
          </Button>
          <Button
            isFullWidth
            colorScheme="green"
            isDisabled={intervals.length === 0}
            onClick={setWorkout}
          >
            Start!
          </Button>
        </ButtonGroup>
        <ZoneModal
          isOpen={isOpen}
          onClose={onClose}
          addInterval={addInterval}
        />

      </Stack>
    </Box>
  )
}