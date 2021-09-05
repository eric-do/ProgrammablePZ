import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Select,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { Workout } from 'types';
import { suggestions } from './data';
import { ZoneGraph } from 'components';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  setWorkout: (w: Workout) => void;
};

export const SuggestionsModal = ({ isOpen, onClose, setWorkout }: ZoneModalProps) => {
  const [filter, setFilter] = useState<{[s: string]: string}>({ type: 'all', timeInSeconds: 'all' })
  const { type, timeInSeconds } = filter;

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.currentTarget
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const setWorkoutAndClose = (w: Workout) => {
    setWorkout(w);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Popular rides</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <Stack spacing={5}>
          <ModalBody>
            <Stack spacing={3}>
              <Select
                name="type"
                value={type}
                onChange={handleDropdown}
                data-testid="zone-type-dropdown"
              >
                <option value="all">All rides</option>
                <option value="pz">Power Zone</option>
                <option value="pze">Power Zone Endurance</option>
                <option value="pzm">Power Zone Max</option>
            </Select>
            <Select
                name="timeInSeconds"
                value={timeInSeconds}
                onChange={handleDropdown}
                data-testid="zone-length-dropdown"
              >
                <option value="all">All lengths</option>
                <option value="1800">30 minutes</option>
                <option value="2700">45 minutes</option>
                <option value="3600">60 minutes</option>
            </Select>
            </Stack>
            <Table mt={5}>
              <Thead>
                <Tr>
                  <Th pr={0}>
                    Minutes
                  </Th>
                  <Th pl={0}>
                    Zones
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  suggestions
                    .filter(suggestion => suggestion.type === type || type === 'all')
                    .filter(suggestion => timeInSeconds === 'all' || suggestion.timeInSeconds.toString() === timeInSeconds)
                    .map((suggestion, i) => {
                      return (
                        <Tr key={i} onClick={() => setWorkoutAndClose(suggestion)}>
                          <Td pr={0}>
                            {Math.floor(suggestion.timeInSeconds / 60 )}
                          </Td>
                          <Td pl={0}>
                            <ZoneGraph
                              intervals={suggestion.intervals}
                              timeInSeconds={suggestion.timeInSeconds}
                            />
                          </Td>
                        </Tr>
                      )
                    })
                }
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </Stack>
      </ModalContent>
    </Modal>
  )
};
