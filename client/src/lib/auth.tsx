import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import { Flex, Spinner} from '@chakra-ui/react'
import {
  RegistrationCredentials,
  LoginCredentials,
  UserResponse,
  AuthUser
} from 'features/auth/types'
import * as AuthAPI from 'features/auth/api';
import storage from 'utils/storage';

const handleUserResponse = async (data: UserResponse) => {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

const loadUser = async () => {
  if (storage.getToken()) {
    const data = await AuthAPI.validateUser();
    return data;
  }
  return null;
}

const loginFn = async (credentials: LoginCredentials) => {
  const response = await AuthAPI.loginUser(credentials);
  const user = await handleUserResponse(response);
  return user;
}

const registerFn = async (credentials: RegistrationCredentials) => {
  const response = await AuthAPI.registerUser(credentials);
  const user = await handleUserResponse(response);
  return user;
}

const logoutFn = async () => {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const LoaderComponent = () => (
  <Flex justify="center" align="center">
    <Spinner data-testid='spinner'/>
  </Flex>
)

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent
}

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentials,
  RegistrationCredentials
>(authConfig);