import React, { createContext, useContext, useState } from 'react';
import { Workout } from 'types';

type ProviderProps = {
  children: React.ReactNode;
};

const initialWorkout: Workout = {
  intervals: [],
  timeInSeconds: 0
};

const initialContext = {
  ride: initialWorkout,
  setRide: () => {}
}

interface IRideContext {
  ride: Workout;
  setRide: (w: Workout) => void;
}

const RideContext = createContext<IRideContext>(initialContext)

export const RideProvider = ({ children }: ProviderProps) => {
  const [ride, setRide] = useState<Workout>(initialWorkout);

  return (
    <RideContext.Provider value={{ride, setRide}}>
      { children }
    </RideContext.Provider>
  )
}

export const useRide = () => {
  const {ride, setRide} = useContext(RideContext);

  // const handleRide = (ride: Workout) => setRide(ride);

  return { ride, setRide }
}