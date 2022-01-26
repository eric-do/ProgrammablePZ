import React, { useState, useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Divider,
  Button,
  KeyboardAvoidingView,
  Box,
  Input,
  Text,
  FlatList,
  VStack,
  HStack,
  Avatar
} from 'native-base';
import {
  Platform,
  StyleSheet,
  Keyboard,
  KeyboardEvent,
  EmitterSubscription
} from 'react-native';
import { TimerStackParamList } from '../';
import { DiscussionComment} from 'types';

const comments: DiscussionComment[] = [
  {
    id: 1,
    user: 'Eric',
    date: 'January 24, 2022',
    comment: 'I love this ride',
    avatar: 'https://loremflickr.com/500/500'
  },
  {
    id: 2,
    user: 'Tina',
    date: 'January 26, 2022',
    comment: 'I hate it',
    avatar: 'https://loremflickr.com/500/500'
  },
  {
    id: 3,
    user: 'Jess',
    date: 'January 28, 2022',
    comment: 'Best ride ever',
    avatar: 'https://loremflickr.com/500/500'
  }
]

type Props = NativeStackScreenProps<TimerStackParamList, 'RideDiscussion'>;

export const RideDiscussion = ({ route }: Props) => {
  const { rideId } = route.params;
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: KeyboardEvent) => setKeyboardOffset(event.endCoordinates.height - 78);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener?.current?.remove();
      keyboardDidHideListener?.current?.remove();
    };
  }, []);

  return (
    <Box h='100%' justifyContent={'space-around'}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <Box
            bgColor='white'
            key={item.id}
            p={3}
          >
            <HStack space={3}>
              <Avatar
                source={{
                  uri: item.avatar,
                }}
              />
              <VStack>
                <HStack space={2}>
                  <Text fontWeight='light' color='muted.500'>{item.user}</Text>
                  <Text fontWeight='light' color='muted.500'>•</Text>
                  <Text fontWeight='light' color='muted.500'>{item.date}</Text>
                </HStack>
                <Box>
                  <Text fontWeight='light'>
                    {item.comment}
                  </Text>
                </Box>
              </VStack>
              </HStack>
          </Box>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <HStack
          position='absolute'
          bottom={keyboardOffset}
        >
          <Input
            value='test'
            bgColor='white'
            w="85%"
            onChangeText={() => {}}
          />
          <Button w='15%'>Send</Button>
        </HStack>
      </KeyboardAvoidingView>
    </Box>
  );
};

