import React from 'react';
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
import { Interval, Workout } from 'types';
import { ZoneModal } from './ZoneModal';
import { ZoneGraph } from 'components';
import { update } from 'lodash';

interface Props {
  intervals: Interval[];
  addInterval: (interval: Interval) => void;
  resetIntervals: () => void;
  startWorkout: () => void;
  time: {
    minutes: number;
    seconds: number;
    timeInSeconds: number;
  }
}

interface ZoneSummary {
  [z: number]: number;
}

export const Intervals = ({
  addInterval,
  intervals,
  time,
  resetIntervals,
  startWorkout
}: Props ) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { minutes, seconds, timeInSeconds } = time;
  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });

  const zoneSummary = intervals.reduce((acc: ZoneSummary, interval) => {
    return {
      ...acc,
      [interval.zone]: acc[interval.zone] + interval.length || interval.length
    }
  }, {})

  return (
    <Box>
      <Stack direction="column" spacing={6}>
        <Heading as="h1" size="lg">Zones</Heading>
        { intervals.length === 0 && <Text>No intervals set</Text>}
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Zone</Th>
              <Th>Length</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Object.keys(zoneSummary).sort().map((key: string, index) => {
                const minutes = Math.floor(zoneSummary[parseInt(key)] / 60);
                const seconds = (zoneSummary[parseInt(key)] % 60).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                });
                return (
                  <Tr key={index}>
                    <Td>
                      <Text fontSize="md">
                        {key}
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
              <Th>
                <Text fontSize="md">
                  {minutes}:{formattedSeconds}
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
        <ZoneGraph
          intervals={intervals}
          timeInSeconds={timeInSeconds}
        />
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
            onClick={resetIntervals}
          >
            Reset
          </Button>
          <Button
            isFullWidth
            colorScheme="green"
            isDisabled={intervals.length === 0}
            onClick={startWorkout}
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