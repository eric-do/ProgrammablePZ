import React, { useState, useContext, createContext } from 'react';
import bell from 'assets/bell.wav';

interface ProviderProps {
  children: React.ReactNode;
}

interface ISoundContext {
  active: boolean;
  toggle: () => void;
  sounds: {
    bell: HTMLAudioElement
  }
}

const initialContext: ISoundContext = {
  active: false,
  toggle: () => {},
  sounds: {
    bell: new Audio(bell)
  }
};

const SoundContext = createContext<ISoundContext>(initialContext);

export const SoundProvider = ({ children }: ProviderProps) => {
  const [ sound, setSound ] = useState<ISoundContext>(initialContext);

  const toggle = () => {
    setSound({
      ...sound,
      active: !sound.active
    })
  };

  return (
    <SoundContext.Provider value={{ ...sound, toggle }} >
      { children }
    </SoundContext.Provider>
  )
}

export const useSound = () => {
  return useContext(SoundContext)
};