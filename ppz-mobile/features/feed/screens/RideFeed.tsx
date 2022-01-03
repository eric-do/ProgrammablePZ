import React from 'react';
import {
  Heading,
  VStack,
  Box,
  ScrollView,
  Text
} from "native-base";;
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { FeedStackParamList } from '../';
import { useStore } from 'store';
import { Ride } from 'types';

type Props = NativeStackScreenProps<FeedStackParamList, 'RideFeed'>;

export const RideFeed = ({ navigation }: Props) => {
  return (
    <Text>RideFeed</Text>
  )
}