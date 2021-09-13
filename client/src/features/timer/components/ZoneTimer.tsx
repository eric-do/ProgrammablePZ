import React, { useState} from "react";
import {
  VStack,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { Intervals } from "features/timer";
import { Timer } from "features/timer";
import { SuggestionsModal } from "./SuggestionsModal";

export const ZoneTimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayTimer, setDisplayTimer] = useState<boolean>(false);

  const startWorkout = () => setDisplayTimer(true);

  return (
    <VStack spacing={8}>
      { !displayTimer &&
        <>
          <Intervals
            startWorkout={startWorkout}
          />
          <Link
            role="link"
            color="teal.500"
            fontSize="sm"
            onClick={onOpen}
          >
            Need a suggestion?
          </Link>
          <SuggestionsModal
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      }
      { displayTimer && <Timer displayTimer={setDisplayTimer}/>}

    </VStack>
  );
}