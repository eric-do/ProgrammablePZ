import React, { useState } from "react"
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button
} from "native-base"

export const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm , setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input type='email' value={email} onChangeText={setEmail} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input type='text' value={username} onChangeText={setUsername} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" value={password} onChangeText={setPassword}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input type="password" value={passwordConfirm} onChangeText={setPasswordConfirm}/>
        </FormControl>
        <Button mt="2" colorScheme="indigo">
          Sign up
        </Button>
      </VStack>
    </Box>
  )
}