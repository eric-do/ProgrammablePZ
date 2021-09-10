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
  Link,
  Spinner,
  Text,
  Flex
} from "@chakra-ui/react"
import { Link as RouterLink} from "react-router-dom";
import { QueryOptions } from 'lib/react-query';
import { Workout } from 'types';
import { ZoneGraph } from 'components';
import { useRides } from 'features/rides/api';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  setWorkout: (w: Workout) => void;
};

const defaultFilter =  {
  type: 'all',
  timeInSeconds: 'all',
  limit: 3
}

export const SuggestionsModal = ({ isOpen, onClose, setWorkout }: ZoneModalProps) => {
  const [filter, setFilter] = useState<QueryOptions>(defaultFilter)
  const { data: rides, isLoading, error } = useRides({ options: filter });
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
            <Stack spacing={3} pb={10}>
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
                <option value="ftp">Power Zone FTP</option>
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
            { error &&
              <Text data-testid='error-message'>
                Something went wrong. Please reload the page.
              </Text>
            }
            { isLoading &&
              <Flex align="center" justify="center">
                <Spinner data-testid='spinner'/>
              </Flex>
            }
            { rides &&
              <>
                <Table
                  mt={5}
                  data-testid="modal-rides-table"
                >
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
                      rides.slice(0, 3).map(ride => {
                        return <Tr
                          key={ride.id}
                          onClick={() => setWorkoutAndClose(ride)}
                          data-testid="modal-table-row"
                        >
                          <Td pr={0}>
                            {Math.floor(ride.timeInSeconds / 60 )}
                          </Td>
                          <Td pl={0}>
                            <ZoneGraph
                              intervals={ride.intervals}
                              timeInSeconds={ride.timeInSeconds}
                            />
                          </Td>
                        </Tr>
                      })
                    }
                  </Tbody>
                </Table>
                <Stack mt={5} direction="row" justify="center">
                  <Link
                    as={RouterLink}
                    to="/rides"
                    role="link"
                    color="teal.500"
                    fontSize="sm"
                  >
                    See more rides
                  </Link>
                </Stack>
              </>
            }
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
