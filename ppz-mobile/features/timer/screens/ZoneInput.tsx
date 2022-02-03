import React, { useState } from "react";
import {
  Text,
  Button,
  HStack,
  Slider,
  VStack,
  Modal,
  Box,
  FormControl,
  Input,
  Select,
  Divider,
  useToast,
  KeyboardAvoidingView
} from "native-base";
import { Platform } from 'react-native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { useStore } from "store";
import { Screen } from '../../../components/layout/Screen';
import { zoneColorSchemes } from "../../../utils/colors";
import { RideBarChart } from "../../../components/RideBarChart";
import { useFocus } from 'hooks';
import { useCreateRide } from 'features/timer/api';

type TimerStackParamList = {
  ZoneInput: undefined;
  RideProgress: undefined
};

type Props = NativeStackScreenProps<TimerStackParamList, 'ZoneInput'>;

type ZoneSummary = {
  [z: number]:  number,
}

export const ZoneInput = ({ navigation }: Props) => {
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const { ride, resetRide } = useStore(state => ({
    ride: state.ride,
    resetRide: state.resetRide
  }))
  const auth = useStore(state => state.auth);

  const zoneSummary = ride.intervals.reduce((acc: ZoneSummary, interval) => {
    return {
      ...acc,
      [interval.zone]: acc[interval.zone] + interval.length || interval.length
    }
  }, {})

  const totalMinutes = Object.values(zoneSummary).reduce((sum, current) => sum + current, 0);

  return (
    <Screen title={'Power Zones'}>
      <VStack space={3} w="60%">
        {
          Object.entries(zoneSummary).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map((zone, idx) => (
            <TableRow
              key={idx}
              category={`Zone ${zone[0]}`}
              quantity={Math.ceil(zone[1] / 60)}
              unit='minutes'
            />
          ))
        }
        <Divider backgroundColor={'gray.600'} w={200}/>
        <TableRow
          category='Total'
          quantity={Math.ceil(totalMinutes / 60)}
          unit='minutes'
        />
      </VStack>
      <Box h={100} px='10%'>
        <RideBarChart ride={ride} />
      </Box>
      <Button.Group px="10%" justifyContent='center'>
        <Button
          w='50%'
          colorScheme="gray"
          onPress={resetRide}
        >
          Reset
        </Button>
        <Button
          w='50%'
          colorScheme="blue"
          onPress={() => setShowInputModal(true)}
        >
          Add zone
        </Button>
      </Button.Group>
      <Button.Group px="10%" justifyContent='center'>
        <Button
          isDisabled={ride.intervals.length === 0}
          w={ auth ? '50%' : '100%' }
          colorScheme="green"
          onPress={() => navigation.navigate('RideProgress')}
        >
          Start!
        </Button>
        <>
          {
            auth &&
              <Button
                w='50%'
                colorScheme="pink"
                onPress={() => setShowSaveModal(true)}
              >
                Save ride
              </Button>
          }
        </>
      </Button.Group>
      <ZoneModal showModal={showInputModal} setShowModal={setShowInputModal}/>
      <SaveRideModal showModal={showSaveModal} setShowModal={setShowSaveModal}/>
    </Screen>
  )
}

interface RowProps {
  category: string;
  quantity: number;
  unit: string;
}

const TableRow = ({ category, quantity, unit }: RowProps) => {
  return (
    <HStack space={2}>
      <Text alignSelf="flex-end" w="50%" fontSize="md">{category}</Text>
      <Text w="50%" fontSize="md">{quantity} {unit}</Text>
    </HStack>
  );
}

interface ModalProps {
  showModal: boolean;
  setShowModal: (b: boolean) => void;
};

const ZoneModal = ({ showModal, setShowModal }: ModalProps) => {
  const [zone, setZone] = useState<number>(1);
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [minutesInput, setFocusMinutes] = useFocus();
  const [secondsInput, setFocusSeconds] = useFocus();
  const { ride, setRide,} = useStore(state => ({
    ride: state.ride,
    setRide: state.setRide
  }))

  const handleMinuteChange = (minutes: string) => {
    setMinutes(minutes);
    if (minutes.length >= 2) {
      setFocusSeconds();
    }
  }

  const addZoneAndCloseModal = () => {
    const updatedRide = {...ride}
    updatedRide.intervals.push({
      length: parseInt(minutes) * 60,
      zone: zone
    });
    updatedRide.timeInSeconds = updatedRide.intervals.reduce((sum, interval) => (
      sum + interval.length
    ), 0);
    setMinutes('');
    setSeconds('');
    setRide(updatedRide);
    setShowModal(false);
  }

  return (
    <Modal
      avoidKeyboard
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add a zone</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
          <Text>Zone: {zone}</Text>
          <Slider
            defaultValue={zone}
            minValue={1}
            maxValue={7}
            colorScheme={zoneColorSchemes[zone]}
            accessibilityLabel="Zone picker"
            step={1}
            onChange={(z: number) => setZone(z)}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text>Time</Text>
          <HStack>
          <Input
            w='15%'
            value={minutes}
            keyboardType='number-pad'
            ref={minutesInput}
            onChangeText={handleMinuteChange}
            maxLength={2}
            textAlign={'center'}
          />
          <Text px={2}>:</Text>
          <Input
            w='15%'
            keyboardType='number-pad'
            ref={secondsInput}
            maxLength={2}
            textAlign={'center'}
          />
          </HStack>
          <Button onPress={addZoneAndCloseModal}>Add zone</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const SaveRideModal = ({ showModal, setShowModal }: ModalProps) => {
  const [type, setType] = useState<string>('pz');
  const [minutes, setMinutes] = useState<string>('30');
  const ride = useStore(state => state.ride);
  const createRideMutation = useCreateRide();
  const toast = useToast();

  const saveRideAndCloseModal = () => {
    createRideMutation.mutateAsync({ data: { ride } }, {
      onSuccess: () => toast.show({
        title: 'Ride saved',
        description: 'Find this ride in your Profile.',
        status: 'success'
      }),
      onError: () => toast.show({
        title: 'Error saving ride',
        description: 'Please try again later.',
        status: 'error'
      }),
    });
    setShowModal(false);
  }

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      avoidKeyboard
    >
      <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Save ride</Modal.Header>
      <Modal.Body>
        <VStack space={3}>
          <FormControl>
            <FormControl.Label>Title</FormControl.Label>
            <Input
              type="text"
              defaultValue={`${new Date().toLocaleDateString('en-US')} ride`}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Ride type</FormControl.Label>
            <Select
              selectedValue={type}
              accessibilityLabel="Select class type"
              onValueChange={(zone) => setType(zone)}
            >
              <Select.Item label='Power Zone' value='pz' />
              <Select.Item label='Power Zone Endurance' value='pze' />
              <Select.Item label='Power Zone Max' value='pzm' />
              <Select.Item label='Power Zone FTP' value='ftp' />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label>Length</FormControl.Label>
            <Select
              selectedValue={minutes}
              accessibilityLabel="Select class length"
              onValueChange={(minutes) => setMinutes(minutes)}
            >
              <Select.Item label='30 minutes' value='30' />
              <Select.Item label='45 minutes' value='45' />
              <Select.Item label='60 minutes' value='60' />
              <Select.Item label='75 minutes' value='75' />
              <Select.Item label='90 minutes' value='90' />
            </Select>
          </FormControl>
          <Button onPress={saveRideAndCloseModal}>Save</Button>
        </VStack>
      </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}