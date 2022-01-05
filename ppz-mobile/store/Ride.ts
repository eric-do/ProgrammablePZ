import { SetState } from  'zustand';
import { Ride } from '../types';
import { StoreState } from './'

const defaultRide: Ride = {
  intervals: [],
  timeInSeconds: 0,
  type: 'pz'
};

export interface RideState {
  ride: Ride;
  setRide: (ride: Ride) => void;
  resetRide: () => void;
}

export const createRideSlice: any = (set: SetState<StoreState>) => ({
  ride: defaultRide,
  setRide: (ride: Ride) => set(() => ({ ride })),
  resetRide: () => {
    set(() => ({
      ride: {
        intervals: [],
        timeInSeconds: 0,
        type: 'pz',
        title: `${new Date().toLocaleDateString('en-US')} ride`
      }
    }))
  }
})