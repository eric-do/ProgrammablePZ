import React, { useState } from 'react';
import { useAuth } from 'lib/auth';
import {
  Button,
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

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps ) => {
  const [input, setInput] = useState<LoginInput>(defaultInput)
  const { login } = useAuth();
  const { username, password } = input;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(input)
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
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
  )
};