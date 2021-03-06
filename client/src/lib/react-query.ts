import { AxiosError } from 'axios';
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
  UseInfiniteQueryOptions
} from 'react-query';
import { PromiseValue } from 'type-fest';


const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: true,
    retry: false
  }
};

export interface QueryOptions {
  limit?: number;
  type?: string;
  timeInSeconds?: string;
  user?: string;
  userId?: string;
  sort?: string;
}

export interface InfiniteQueryOptions {
  page: number;
  limit: number;
  type?: string;
  timeInSeconds?: string;
  user?: string;
  user_id?: string;
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig});

export type QueryConfig<FetcherFnType extends (...args: any) => any> = UseQueryOptions<
  PromiseValue<ReturnType<FetcherFnType>>
>

export type InfiniteQueryConfig<FetcherFnType extends (...args: any) => any> = UseInfiniteQueryOptions<
  PromiseValue<ReturnType<FetcherFnType>>
>

export type MutationConfig<FetcherFnType extends (...args: any) => any> = UseMutationOptions<
  PromiseValue<ReturnType<FetcherFnType>>,
  AxiosError,
  Parameters<FetcherFnType>[0]
>;