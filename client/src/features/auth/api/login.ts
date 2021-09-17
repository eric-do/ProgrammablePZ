import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig } from 'lib/react-query';
import { LoginCredentials, UserResponse } from '../types';

export const loginUser = (credentials: LoginCredentials): Promise<UserResponse> => {
  return axios.post('/auth/signup', credentials);
}

export interface UserLoginOptions {
  credentials: LoginCredentials,
  config?: MutationConfig<typeof loginUser>
};

export const useLoginUser = ({ config }: UserLoginOptions) => {
  return useMutation({
    ...config,
    mutationFn: loginUser
  });
};