import React from 'react';
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Stack
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { Interval } from '../types';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  addInterval: (i: Interval) => void;
};

const defaultInterval = {
  zone: 'Spin ups',
  length: 30
}

export const ZoneModal = ({ isOpen, onClose, addInterval }: ZoneModalProps) => {
  const [interval, setInterval] = React.useState<Interval>(defaultInterval)

  const handleInterval = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.currentTarget
    setInterval({
      ...interval,
      [name]: parseInt(value)
    })
  }

  const handleCloseAndSave = () => {
    addInterval(interval)
    onClose()
  }

  const { zone, length } = interval;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Add Power Zone</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <form>
            <Stack direction="column" spacing={4}>
              <FormControl isRequired={true}>
                <Select
                  name="zone"
                  value={zone}
                  onChange={handleInterval}
                  data-testid="zone-dropdown"
                >
                  <option value="0">Spin ups</option>
                  <option value="1">Zone 1</option>
                  <option value="2">Zone 2</option>
                  <option value="3">Zone 3</option>
                  <option value="4">Zone 4</option>
                  <option value="5">Zone 5</option>
                  <option value="6">Zone 6</option>
                  <option value="7">Zone 7</option>
                </Select>
              </FormControl>

              <FormControl isRequired={true}>
                <Select
                  name="length"
                  value={length}
                  onChange={handleInterval}
                  data-testid="length-dropdown"
                >
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                  <option value="120">2 minutes</option>
                  <option value="180">3 minutes</option>
                  <option value="240">4 minutes</option>
                  <option value="300">5 minutes</option>
                  <option value="360">6 minutes</option>
                  <option value="420">7 minutes</option>
                  <option value="480">8 minutes</option>
                  <option value="540">9 minutes</option>
                  <option value="600">10 minutes</option>
                </Select>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleCloseAndSave}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
