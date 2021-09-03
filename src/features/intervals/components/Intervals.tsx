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
import { Interval } from '../types';
import { ZoneModal } from './ZoneModal';
import { zoneColors } from 'shared';

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
  })

  return (
    <Box>
      <Stack direction="column" spacing={6}>
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
                  {minutes}:{formattedSeconds}
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
          data-testid="interval-zone-chart"
        >
          {
            intervals.map((interval, index) => (
              <Box
                key={index}
                bg={zoneColors[parseInt(interval.zone)]}
                h={`${(parseInt(interval.zone) / 7) * 100}%`}
                w={`${((interval.length) / timeInSeconds) * 100}%`}
                data-testid="interval-chart-bar"
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