export interface Interval {
  zone: string;
  length: number;
}

export interface Workout {
  intervals: Interval[];
  timeInSeconds: number;
};

export interface ColorDict {
  [k: number]: string
}