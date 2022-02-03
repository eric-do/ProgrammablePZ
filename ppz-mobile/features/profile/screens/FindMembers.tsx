import React, { useState } from 'react';
import {
  Box,
  Divider,
  Center,
  Text,
  Input,
  Icon,
  FlatList,
  VStack
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from 'store'
import { useMemberSearch } from '../api';
import { UserListItem } from '../components';

export const FindMembers = () => {
  const [name, setName] = useState('');
  const { users, isFetching, error, fetchNextPage } = useMemberSearch({
    options: {
      username: name
    }
  })

  return (
    <VStack w='100%' bgColor='white' p='15px'>
      <Box>
        <Input
          value={name}
          onChangeText={setName}
          InputLeftElement={
            <Box paddingLeft={2}>
              <Ionicons
                name='search'
                size={15}
                color='gray'
              />
            </Box>
          }
        />
      </Box>
      <FlatList
        data={users}
        renderItem={({item, index}) => (
          <UserListItem user={item} key={index}/>
        )}
      >
      </FlatList>
    </VStack>
  )
}