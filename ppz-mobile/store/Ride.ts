import { SetState } from  'zustand';
import { Ride } from '../types';

const defaultRide: Ride = {
  intervals: [],
  timeInSeconds: 0
};

export interface RideState {
  ride: Ride;
  setRide: (ride: Ride) => void;
  resetRide: () => void;
}

export const createRideSlice = (set: SetState<RideState>) => ({
  ride: defaultRide,
  setRide: (ride: Ride) => set(() => ({ ride })),
  resetRide: () => set(() => ({ ride: {
      ...defaultRide,
      title: `${new Date().toLocaleDateString('en-US')} ride`
  }}))
})