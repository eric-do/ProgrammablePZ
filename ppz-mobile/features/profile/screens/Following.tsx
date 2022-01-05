import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Divider,
  Badge,
  Slide
} from "native-base"
import { Ionicons } from '@expo/vector-icons';
import { useStore } from 'store';

export const Following = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Box w='100%' bgColor='white' p='15px'>
      <HStack alignContent='center' justifyContent='space-between'>
        <Text>Tina Do</Text>
        <HStack alignContent='center' space={2} >
          <Text color='orange.500' onPress={() => setIsOpen(!isOpen)}>Following</Text>
          <Ionicons name='ios-chevron-down' size={15} color='orange' />
        </HStack>
      </HStack>
      <Slide in={isOpen} placement='bottom'>
        <Box bgColor='white'>
          <Heading>Follow options</Heading>
        </Box>
      </Slide>
    </Box>
  );
};