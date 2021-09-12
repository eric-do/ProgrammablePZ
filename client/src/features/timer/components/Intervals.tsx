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
import { useRide } from 'providers/RideProvider';
import { Interval } from 'types';
import { ZoneModal } from './ZoneModal';
import { ZoneGraph } from 'components';

interface Props {
  startWorkout: () => void;
}

interface ZoneSummary {
  [z: number]: number;
}

export const Intervals = ({
  startWorkout
}: Props ) => {
  const { ride, setRide } = useRide();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const minutes = Math.floor(ride.timeInSeconds / 60)
  const seconds = ride.timeInSeconds % 60;
  const formattedSeconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  const { intervals, timeInSeconds } = ride;

  const addInterval = (interval: Interval) => {
    const intervals = [...ride.intervals, interval];
    const timeInSeconds = intervals.reduce((total, interval) => total + interval.length, 0)

    setRide({
      ...ride,
      intervals,
      timeInSeconds
    })
  }

  const resetIntervals = () => setRide({
    ...ride,
    intervals: []
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