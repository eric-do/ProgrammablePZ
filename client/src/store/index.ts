import create from 'zustand';
import { createRideSlice } from './Ride';

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...(infer R)]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type State = StateFromFunctions<[
  typeof createRideSlice
]>

export const useStore = create<State>(set => ({
  ...createRideSlice(set)
}));