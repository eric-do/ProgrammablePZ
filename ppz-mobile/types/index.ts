export interface Interval {
  zone: number;
  timeInSeconds: number;
}

export interface Ride {
  intervals: Interval[];
  timeInSeconds: number;
  creator_id?: string;
  username?: string;
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

export interface User {
  id: string;
  username: string;
  is_friend: boolean;
}