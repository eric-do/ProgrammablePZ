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
  TableCaption,
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
        <Heading as="h1" size="lg">Intervals</Heading>
        { intervals.length === 0 && <Text>No intervals set</Text>}
        <Table>
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
              <Th>Total time</Th>
              <Th></Th>
              <Th>{minutes}:{seconds}</Th>
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