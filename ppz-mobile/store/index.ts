import create, { GetState, SetState } from 'zustand';
import { createRideSlice, RideState } from './Ride';
import { createUserSlice, AuthState } from './Auth';
import { createSocialSlice, SocialState } from './Social';

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...(infer R)]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

// export type StoreState = StateFromFunctions<[
//   typeof createRideSlice,
//   typeof createUserSlice
// ]>;

export type StoreState = RideState & AuthState & SocialState;

export const useStore = create<StoreState>((set) => ({
  ...createRideSlice(set),
  ...createUserSlice(set),
  ...createSocialSlice(set)
}));