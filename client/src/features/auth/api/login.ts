import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig } from 'lib/react-query';
import { LoginCredentials } from '../types';

export const loginUser = (credentials: LoginCredentials) => {
  return axios.post('/auth/signup', credentials);
}

interface UseRegisterOptions {
  credentials: LoginCredentials,
  config?: MutationConfig<typeof loginUser>
};

export const useRegisterUser = ({ config }: UseRegisterOptions) => {
  return useMutation({
    ...config,
    mutationFn: loginUser
  });
};