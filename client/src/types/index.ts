export interface Interval {
  zone: number;
  length: number;
}

export interface Workout {
  intervals: Interval[];
  timeInSeconds: number;
  type?: string;
  id?: number;
  title?: string;
  metadata?: {
    rideCount: number
  };
  ratings?: {
    up: number;
    total: number;
  }
};

export interface ColorDict {
  [k: number]: string
}