import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react"
import { useRide } from 'providers/RideProvider';
import { useRateRide } from 'features/rides/api/rateRide';

interface FinishRideModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export const FinishRideModal = ({ isOpen, onClose }: FinishRideModalProps) => {
  const { ride } = useRide();
  const [ratingScore, setRatingScore] = useState<number | null>(null);
  const [difficultyScore, setDifficultyScore] = useState<number | null>(null);
  const options = {
    rideId: ride.id,
    ratings: {
      rating: ratingScore,
      difficulty: difficultyScore
    }
  };

  const { mutate: rateRide } = useRateRide(options)

  const ratings = [1, 2, 3, 4, 5];

  const handleSubmitAndClose = () => {
    rateRide(options);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      data-testid="save-ride-modal"
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader role="heading">Great ride!</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <form data-testid="finish-ride-form">
            <Stack spacing={4}>
              <Text>Help us categorize this workout.</Text>
              <Heading as="h2" size="sm">Rating</Heading>
              <Flex pl={7} pr={7} data-testid="ratings-buttons">
                {
                  ratings.map((rating, idx) => (
                    idx < ratings.length - 1
                    ? <React.Fragment key={rating}>
                        <Button
                          variant={rating === ratingScore ? 'solid' : 'ghost'}
                          onClick={() => setRatingScore(rating)}
                        >{rating}</Button>
                        <Spacer />
                      </React.Fragment>
                    : <Button
                        variant={rating === ratingScore ? 'solid' : 'ghost'}
                        onClick={() => setRatingScore(rating)}
                        key={rating}
                      >{rating}</Button>
                  ))
                }
              </Flex>
              <Spacer />
              <Heading as="h2" size="sm">Difficulty</Heading>
              <Flex pl={7} pr={7}>
                {
                  ratings.map((rating, idx) => (
                    idx < ratings.length - 1
                    ? <React.Fragment key={rating}>
                        <Button
                          variant={rating === difficultyScore ? 'solid' : 'ghost'}
                          onClick={() => setDifficultyScore(rating)}
                        >{rating}</Button>
                        <Spacer />
                      </React.Fragment>
                    : <Button
                        variant={rating === difficultyScore ? 'solid' : 'ghost'}
                        onClick={() => setDifficultyScore(rating)}
                        key={rating}
                      >{rating}</Button>
                  ))
                }
              </Flex>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmitAndClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
