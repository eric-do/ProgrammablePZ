import React, { useState } from "react";
import {
  Text,
  Button,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Slider,
  VStack,
  Code,
  View,
  Modal
} from "native-base";
import { useStore } from "../../store";
import { Screen } from '../../components/layout/Screen';
import { zoneColors } from "../../utils/colors";

export const Timer = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { ride, setRide, resetRide } = useStore(state => ({
    ride: state.ride,
    setRide: state.setRide,
    resetRide: state.resetRide
  }))

  return (
    <Screen>
      <Button.Group px="10%" justifyContent='center'>
        <Button w='50%' colorScheme="gray">Reset</Button>
        <Button
          w='50%'
          colorScheme="blue"
          onPress={() => setShowModal(true)}
        >
          Add zone
        </Button>
      </Button.Group>
      <Button.Group px="10%" justifyContent='center'>
        <Button w='50%' colorScheme="green">Start!</Button>
        <Button w='50%' colorScheme="pink">Save ride</Button>
      </Button.Group>
      <ZoneModal showModal={showModal} setShowModal={setShowModal}/>
    </Screen>
  )
}

interface ModalProps {
  showModal: boolean;
  setShowModal: (b: boolean) => void;
};

const ZoneModal = ({ showModal, setShowModal }: ModalProps) => {
  const [zone, setZone] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(3);
  const { ride, setRide,} = useStore(state => ({
    ride: state.ride,
    setRide: state.setRide
  }))

  const addZoneAndCloseModal = () => {
    const updatedRide = {...ride}
    updatedRide.intervals.push({
      timeInSeconds: minutes * 60,
      zone: zone
    });
    setRide(updatedRide);
    setShowModal(false);
  }

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Add a zone</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
          <Text>Zone: {zone}</Text>
          <Slider
            defaultValue={zone}
            minValue={1}
            maxValue={7}
            colorScheme={zoneColors[zone]}
            accessibilityLabel="Zone picker"
            step={1}
            onChange={(z: number) => setZone(z)}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text>Minutes: {minutes}</Text>
          <Slider
            defaultValue={zone}
            minValue={1}
            maxValue={30}
            accessibilityLabel="Time"
            step={1}
            onChange={(minutes: number) => setMinutes(minutes)}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Button onPress={addZoneAndCloseModal}>Add zone</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}