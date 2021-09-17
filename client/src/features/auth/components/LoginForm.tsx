import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'

interface LoginInput {
  username: string;
  password: string;
}

const defaultInput = {
  username: '',
  password: ''
}

export const LoginForm = () => {
  const [input, setInput] = useState<LoginInput>(defaultInput)
  const { username, password } = input;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInput({
      ...input,
      [name]: value
    })
  }

  return (
    <Stack spacing={4}>
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </FormControl>
    </Stack>
  )
};