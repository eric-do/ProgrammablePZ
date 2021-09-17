import { useQuery } from 'react-query';
import { axios } from 'lib/axios';
import { QueryConfig } from 'lib/react-query';
import { AuthUser } from '../types';

export const validateUser = (): Promise<AuthUser> => {
  return axios.get('/auth/validate');
}

interface ValidateUserOptions {
  config?: QueryConfig<typeof validateUser>
};

export const useValidateUser = ({ config }: ValidateUserOptions) => {
  return useQuery({
    ...config,
    queryKey: 'user',
    queryFn: validateUser
  });
};