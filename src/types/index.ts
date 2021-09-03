import { Interval } from 'features/intervals/types'

export interface Workout {
  intervals: Interval[];
  timeInSeconds: number;
};

export interface ColorDict {
  [k: number]: string
}