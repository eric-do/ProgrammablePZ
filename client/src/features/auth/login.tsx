import React from 'react';
import {
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

export const Login = () => {
  return (
    <form>
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Username" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" />
      </FormControl>
    </form>
  )
};