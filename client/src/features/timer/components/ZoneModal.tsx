import React from 'react';
import {
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Text
} from "@chakra-ui/react"
import { Interval } from 'types';
import { zoneColors } from 'shared'

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  addInterval: (i: Interval) => void;
};

export const ZoneModal = ({ isOpen, onClose, addInterval }: ZoneModalProps) => {
  const [minutes, setMinutes] = React.useState<number>(7);
  const [zone, setZone] = React.useState<number>(3);
  const timeInSeconds = minutes * 60;

  const handleMinuteSlider = (minutes: number) => setMinutes(minutes);
  const handleZoneSlider = (minutes: number) => setZone(minutes);

  const handleCloseAndSave = () => {
    addInterval({
      zone,
      length: timeInSeconds
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Add Power Zone</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <form>
            <Stack direction="column" spacing={4} px={2}>
              <FormControl>
                <FormLabel htmlFor="zone-slider">
                  <Flex align="center">
                    <Text>Zone</Text>
                    <Text>:</Text>
                    <Text fontSize="xl" pl={3} >{ zone }</Text>
                  </Flex>
                </FormLabel>
                <Flex align="center" justify="center">
                <Slider
                  data-testid="zone-slider"
                  aria-labelledby="Zone"
                  flex="1"
                  focusThumbOnChange={false}
                  value={zone}
                  min={1}
                  max={7}
                  onChange={handleZoneSlider}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={zoneColors[zone]}/>
                  </SliderTrack>
                  <SliderThumb bg={zoneColors[zone]} color="gray.800" fontSize="sm" boxSize="32px" children={zone} />
                </Slider>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="time-slider">
                  <Flex align="center">
                    <Text>Minutes</Text>
                    <Text>:</Text>
                    <Text fontSize="xl" pl={3} >{ minutes }</Text>
                  </Flex>
                </FormLabel>
                <Flex>
                <Slider
                  data-testid="time-slider"
                  flex="1"
                  focusThumbOnChange={false}
                  value={minutes}
                  min={1}
                  max={15}
                  onChange={handleMinuteSlider}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb bg="blue.200" color="gray.800" fontSize="sm" boxSize="32px" children={minutes} />
                </Slider>
                </Flex>
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
