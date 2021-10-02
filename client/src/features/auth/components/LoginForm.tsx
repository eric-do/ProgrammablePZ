import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from 'lib/auth';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast
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
  const toast = useToast();
  const [input, setInput] = useState<LoginInput>(defaultInput)
  const { login, user } = useAuth();
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
    try {
      await login(input);
    } catch (err: any) {
      toast({
        title: "Login unsuccessful",
        description: err.response.data.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <form
      data-testid="login-form"
      onSubmit={handleSubmit}
    >
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