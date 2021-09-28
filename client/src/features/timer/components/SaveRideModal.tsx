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
  const mutateData = { data: { ride: { ...ride, title } }};

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setTitle(value)
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
            <Input
              name='title'
              value={title}
              onChange={handleTitleChange}
            />
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
