import React, { useMemo } from 'react';
import {
  Text,
  Divider,
  Box,
  Heading,
  Pressable,
  Badge,
  VStack,
  Flex,
  HStack
} from "native-base";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Ride } from '../../../types';
import { RideBarChart } from '../../../components/RideBarChart';

const pzDictionary: { [k: string]: string} = {
  pz: 'Power Zone',
  pze: 'Power Zone Endurance',
  pzm: 'Power Zone Max',
  ftp: 'FTP Ride'
}

interface RideCardProps {
  ride: Ride;
  onPress: (r: Ride) => void;
  onPressDiscussion: (r: Ride) => void;
}

export const RideCard = ({
  ride,
  onPress,
  onPressDiscussion
}: RideCardProps ) => {
  const { minutes, seconds } = useMemo(() => {
    const minutes = Math.ceil(ride.timeInSeconds / 60);
    const seconds = ride.timeInSeconds % 60;
    return { minutes, seconds };
  }, [ride.timeInSeconds]);
  const { newCutoffDate, rideDate } = useMemo(() => {
    const newCutoffDate = new Date();
    const rideDate = ride.createdOn ? new Date(ride.createdOn) : new Date();
    newCutoffDate.setMonth(newCutoffDate.getMonth() - 1);
    return { rideDate, newCutoffDate };
  }, [ride.createdOn])

  return (
    <Pressable onPress={() => onPress(ride)}>
      <Box>
        <Box
          py='5px'
          px='5%'
          bgColor='white'
        >
          <Heading size='xs' alignSelf='flex-start'>{ride.title}</Heading>
          <Text alignSelf='flex-start'>{pzDictionary[ride.type]}</Text>
        </Box>
        <Box
          h='90px'
          px='5%'
          py='7px'
          bgColor='darkBlue.800'
        >
          <VStack>
            <Box h='15%'>
              <Flex
                top={0}
                right={0}
                position='absolute'
              >
                {
                  rideDate > newCutoffDate &&
                  <Badge _text={{ fontSize: 10 }}>
                    NEW RIDE
                  </Badge>
                }
              </Flex>
            </Box>
            <Box h='85%' pt='3%'>
            <RideBarChart ride={ride} />
            </Box>
          </VStack>
        </Box>
        <Box
          py='5px'
          px='5%'
          bgColor='gray.50'
        >
          <HStack justifyContent='space-between'>
            <HStack alignItems='center'>
              <CardMetaData
                description='Time'
                quantity={minutes}
                unit='min'
              />
              <MetaDivider />
              <CardMetaData
                description='Rides'
                quantity={ride.metadata?.rideCount || 0}
                unit='rides'
              />
              <MetaDivider />
              <CardMetaData
                description='Likes'
                quantity={ride.ratings?.likes || 0}
                unit=''
              />
            </HStack>
            <HStack
              alignItems='center'
              space={3}
            >
              <FontAwesome
                name='thumbs-o-up'
                size={20}
                color='#3f3f46'
              />
              <Ionicons
                name='chatbox-outline'
                size={20}
                color='#3f3f46'
                onPress={() => onPressDiscussion(ride)}
              />
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

interface MetaProps {
  description: string;
  quantity: number | string;
  unit: string;
}

export const CardMetaData = ({ description, quantity, unit }: MetaProps) => {
  return (
      <HStack alignItems='center' >
        <VStack>
          <Box>
            <Text fontSize='xs' fontWeight='thin'>{ description }</Text>
            <Text fontSize='sm' fontWeight='normal'>{ quantity } {unit}</Text>
          </Box>
        </VStack>
    </HStack>
  )
}

export const MetaDivider = () => <Divider orientation="vertical" mx="3" h='70%'/>;