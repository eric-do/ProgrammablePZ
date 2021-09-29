import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Select,
  Stack,
  Input,
  useToast
} from "@chakra-ui/react"
import { useRide } from 'providers/RideProvider';
import { useCreateRide } from 'features/rides/api/createRide';

interface SaveRideModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export const SaveRideModal = ({ isOpen, onClose }: SaveRideModalProps) => {
  const { ride } = useRide();
  const toast = useToast();
  const createRideMutation = useCreateRide({ ride });
  const [title, setTitle] = useState(`${new Date().toLocaleDateString('en-US')} ride`)
  const [type, setType] = useState('pz');
  const [timeInSeconds, setTimeInSeconds] = useState(2700);
  const mutateData = { data: { ride: { ...ride, title, type, timeInSeconds } }};

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTitle(value)
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setType(value);
  }

  const handleLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setTimeInSeconds(parseInt(value));
  }

  const handleSubmit = () => {
      createRideMutation.mutate(mutateData)
      toast({
        title: "Ride saved!",
        description: "Find it in your Saved Rides.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Name this ride</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="ride-name-input">
                <FormLabel>Name</FormLabel>
                <Input
                  name='title'
                  value={title}
                  onChange={handleTitleChange}
                />
              </FormControl>
              <FormControl id="ride-type-select">
                <FormLabel>Type</FormLabel>
                <Select
                  value={type}
                  name="type"
                  onChange={handleTypeChange}
                >
                  <option value="pz">Power Zone</option>
                  <option value="pze">Power Zone Enudurance</option>
                  <option value="pzm">Power Zone Max</option>
                  <option value="ftp">Power Zone FTP</option>
                </Select>
              </FormControl>
              <FormControl id="ride-length-select">
                <FormLabel>Length</FormLabel>
                <Select
                  value={timeInSeconds}
                  name="timeInSeconds"
                  onChange={handleLengthChange}
                >
                  <option value="1200">20 minutes</option>
                  <option value="1800">30 minutes</option>
                  <option value="2700">45 minutes</option>
                  <option value="3600">60 minutes</option>
                </Select>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
