import React, { useState } from 'react';
import { useAuth } from 'lib/auth';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

const defaultInput = {
  username: '',
  password: '',
  email: ''
}

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [input, setInput] = useState<RegisterInput>(defaultInput)
  const { register } = useAuth();
  const { username, password, email } = input;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(input);
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
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
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