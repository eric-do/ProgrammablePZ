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
    rating: number;
    difficulty: number;
    likes: number;
    total: number;
  },
  createdOn?: string;
};

export interface ColorDict {
  [k: number]: string
}