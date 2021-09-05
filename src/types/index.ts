export interface Interval {
  zone: number;
  length: number;
}

export interface Workout {
  intervals: Interval[];
  timeInSeconds: number;
  type?: string;
};

export interface ColorDict {
  [k: number]: string
}