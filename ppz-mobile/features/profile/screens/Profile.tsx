import React, { useState, useEffect } from "react"
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
  Pressable,
  Divider,
  Badge
} from "native-base"
import { Ionicons } from '@expo/vector-icons';
import { useStore } from 'store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from 'features/profile';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

interface ProfileSection {
  screen: keyof ProfileStackParamList,
  title: string
}

const profileSections: ProfileSection[] = [
  {
    screen: 'FindMembers',
    title: 'Find Members'
  },
  {
    screen: 'SavedRides',
    title: 'Saved Rides'
  }
]

export const Profile = ({ navigation }: Props) => {
  const user = useStore(state => state.auth?.user);
  const {
    followers,
    following,
    followerCount,
    followingCount,
    setFollowers,
    setFollowing,
    setMetadata
  } = useStore(state => ({
    followers: state.followers,
    following: state.following,
    followerCount: state.followerCount,
    followingCount: state.followingCount,
    setFollowers: state.setFollowers,
    setFollowing: state.setFollowing,
    setMetadata: state.setMetadata,
  }));
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      try {
        if (user?.id) {
          setFollowing({id: user.id, limit: 20, offset: 0});
          setFollowers({id: user.id, limit: 20, offset: 0});
          setMetadata({ id: user.id });
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    })()
  }, [user])

  return (
    <VStack w='100%' space={0}>
      <Box w='100%' bgColor='white' p='15px'>
        <Text fontWeight='bold'>{user?.username}</Text>
        <HStack justifyContent='space-between'>
          <HStack alignItems='center'>
            <MetaData
              description='Following'
              quantity={followingCount}
              onPress={() => navigation.navigate('Following')}
            />
            <MetaDivider />
            <MetaData
              description='Followers'
              quantity={followerCount}
              onPress={() => navigation.navigate('Followers')}
            />
          </HStack>
          <HStack alignItems='center'>
            <Badge variant='outline' colorScheme="orange">Edit Profile</Badge>
          </HStack>
        </HStack>
      </Box>
      <Divider h='1.3px'/>
      <VStack space='1.3px'>
      {
        profileSections.map((section, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(section.screen)}
          >
            <HStack
              justifyContent={'space-between'}
              bgColor='white'
              p='15px'
              mt={0}
            >
              <Text>{section.title}</Text>
              <Center>
                <Ionicons name='chevron-forward' />
              </Center>
            </HStack>
          </Pressable>
        ))
      }
      </VStack>
    </VStack>
  )
}

interface MetaDataProps {
  description: string;
  quantity: number;
  onPress: () => void;
}

const MetaData = ({ description, quantity, onPress }: MetaDataProps) => (
  <VStack>
    <Link
      isUnderlined={false}
      onPress={onPress}
      _text={{
        fontSize: "xs",
        _light: {
          color: "orange.500",
        },
        color: "orange.300",
      }}
    >
      {description}
    </Link>
    <Text>{quantity}</Text>
  </VStack>
)

export const MetaDivider = () => <Divider orientation="vertical" mx="2" h='70%'/>;