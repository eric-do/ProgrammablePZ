import React from 'react';
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
  Badge
} from "native-base"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from 'features/profile';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Followers'>;

export const Followers = ({ navigation }: Props) => {
  return (
    <Text>Followers</Text>
  );
};