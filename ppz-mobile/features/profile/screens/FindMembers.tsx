import React, { useState } from 'react';
import {
  Box,
  Divider,
  Center,
  Text,
  Input,
  Icon
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from 'store'

export const FindMembers = () => {
  const [name, setName] = useState('');

  return (
    <Box w='100%' bgColor='white' p='15px'>
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
  )
}