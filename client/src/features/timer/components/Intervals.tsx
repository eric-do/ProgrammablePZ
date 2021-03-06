import React from 'react';
import { useStore } from 'store';
import {
  Button,
  ButtonGroup,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure
} from "@chakra-ui/react"
import { Interval } from 'types';
import { ZoneModal } from './ZoneModal';
import { SaveRideModal } from './SaveRideModal';
import { ZoneGraph, Page } from 'components';

interface Props {
  startWorkout: () => void;
}

interface ZoneSummary {
  [z: number]: number;
}

export const Intervals = ({
  startWorkout
}: Props ) => {
  const { ride, setRide, resetRide } = useStore((
    { ride, setRide, resetRide }) => ({ ride, setRide, resetRide })
  );
  const {
    isOpen: isOpenZone,
    onOpen: onOpenZone,
    onClose: onCloseZone
  } = useDisclosure();
  const {
    isOpen: isOpenSave,
    onOpen: onOpenSave,
    onClose: onCloseSave
  } = useDisclosure();
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

  const removeInterval = (idx: number) => {
    const updatedIntervals = [...intervals];
    updatedIntervals.splice(idx, 1);
    const timeInSeconds = updatedIntervals.reduce((total, interval) => total + interval.length, 0)
    setRide({
      ...ride,
      intervals: updatedIntervals,
      timeInSeconds
    })
  }

  const resetIntervals = () => resetRide();

  const zoneSummary = intervals.reduce((acc: ZoneSummary, interval) => {
    return {
      ...acc,
      [interval.zone]: acc[interval.zone] + interval.length || interval.length
    }
  }, {})

  return (
    <Page title="Zones">
        <Stack direction="column" spacing={6}>
        { intervals.length === 0 && <Text>No intervals set</Text>}
        <Table size="lg">
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
          removeInterval={removeInterval}
        />
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
            colorScheme="blue"
            onClick={onOpenZone}
          >
            Add Zone
          </Button>
        </ButtonGroup>
        <Button
          isFullWidth
          colorScheme="green"
          isDisabled={intervals.length === 0}
          onClick={startWorkout}
        >
          Start!
        </Button>
        <Button
          colorScheme="red"
          isFullWidth
          isDisabled={intervals.length === 0}
          onClick={onOpenSave}
        >
          Save ride
        </Button>
        <ZoneModal
          isOpen={isOpenZone}
          onClose={onCloseZone}
          addInterval={addInterval}
        />
        <SaveRideModal
          isOpen={isOpenSave}
          onClose={onCloseSave}
        />
      </Stack>
      </Page>

  )
}