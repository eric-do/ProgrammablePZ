import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig } from 'lib/react-query';
import { RegistrationCredentials, UserResponse } from '../types';

export const registerUser = (credentials: RegistrationCredentials): Promise<UserResponse> => {
  return axios.post('/auth/register', credentials);
}

export interface UseRegisterOptions {
  credentials: RegistrationCredentials,
  config?: MutationConfig<typeof registerUser>
};

export const useRegisterUser = ({ config }: UseRegisterOptions) => {
  return useMutation({
    ...config,
    mutationFn: registerUser
  });
};