import React, { createContext, useContext, useState } from 'react';
import { Workout } from 'types';

type ProviderProps = {
  children: React.ReactNode;
};

const initialWorkout: Workout = {
  intervals: [],
  timeInSeconds: 1800
};

const initialContext = {
  ride: initialWorkout,
  setRide: () => {},
  resetRide: () => {}
}

interface IRideContext {
  ride: Workout;
  setRide: (w: Workout) => void;
  resetRide: () => void;
}

const RideContext = createContext<IRideContext>(initialContext)

export const RideProvider = ({ children }: ProviderProps) => {
  const [ride, setRide] = useState<Workout>(initialWorkout);

  const resetRide = () => setRide({
    ...initialWorkout,
    title: `${new Date().toLocaleDateString('en-US')} ride`
  });

  return (
    <RideContext.Provider value={{ride, setRide, resetRide}}>
      { children }
    </RideContext.Provider>
  )
}

export const useRide = () => {
  const {ride, setRide, resetRide} = useContext(RideContext);

  return { ride, setRide, resetRide }
}