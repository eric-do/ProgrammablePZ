import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading
} from '@chakra-ui/react'

interface LoginInput {
  username: string;
  password: string;
}

const defaultInput = {
  username: '',
  password: ''
}

export const Login = () => {
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
    <Box px={4}>
      <Heading size="lg">
        Login
      </Heading>
      <form>
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
        <Button
          mt={10}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  )
};