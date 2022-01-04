import * as React from "react"
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
import { useStore } from 'store';

export const Profile = () => {
  const user = useStore(state => state.auth?.user);

  return (
    <VStack w='100%' space={4}>
      <Box w='100%' bgColor='white' p='15px'>
        <Text fontWeight='bold'>{user?.username}</Text>
        <HStack justifyContent='space-between'>
          <HStack alignItems='center'>
            <MetaData description='Following' quantity={10} />
            <MetaDivider />
            <MetaData description='Followers' quantity={13} />
          </HStack>
          <HStack alignItems='center'>
            <Badge variant='outline' colorScheme="orange">Edit Profile</Badge>
          </HStack>
        </HStack>
      </Box>

    </VStack>
  )
}

interface MetaDataProps {
  description: string;
  quantity: number;
}

const MetaData = ({ description, quantity }: MetaDataProps) => (
  <VStack>
    <Link
      isUnderlined={false}
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