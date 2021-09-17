import { useMutation } from 'react-query';
import { axios } from 'lib/axios';
import { MutationConfig } from 'lib/react-query';
import { RegistrationCredentials } from '../types';

export const registerUser = (credentials: RegistrationCredentials) => {
  return axios.post('/auth/signup', credentials);
}

interface UseRegisterOptions {
  credentials: RegistrationCredentials,
  config?: MutationConfig<typeof registerUser>
};

export const useRegisterUser = ({ config }: UseRegisterOptions) => {
  return useMutation({
    ...config,
    mutationFn: registerUser
  });
};