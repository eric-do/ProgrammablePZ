import { Workout } from "types";

export const authResponse = {
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5NmYwZGVmLTVhMWYtNGJhOC1hN2QxLWNmZGMyMTA5NjEyZCIsImVtYWlsIjoiZXJpY2RvLjYxN0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRvYm9pIiwiaWF0IjoxNjMxOTAzMzIwLCJleHAiOjE2MzE5MDY5MjB9.d7-4kATh1gQ4mdGDbbCt1ycp9y_wqCZFiTnZoIiC6aU',
  user: {
    username: 'test_user',
    email: 'test@user.com',
    id: 'abc123'
  }
}

export const rides: Workout[] = [
  {
    id: 1,
    type: 'pz',
    title: 'Power Zone Pyramid',
    metadata: {
      rideCount: 345
    },
    ratings: {
      likes: 100,
      total: 105
    },
    intervals: [
      {
        zone: 1,
        length: 180
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 3,
        length: 60
      },
      {
        zone: 4,
        length: 60
      },
      {
        zone: 5,
        length: 60
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 4,
        length: 180
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 4,
        length: 180
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 6,
        length: 60
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 6,
        length: 60
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 4,
        length: 180
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 4,
        length: 180
      },
      {
        zone: 1,
        length: 60
      },
    ],
    timeInSeconds: 2700
  },
  {
    id: 2,
    type: 'pz',
    title: 'High Fives All Around!',
    metadata: {
      rideCount: 234
    },
    ratings: {
      likes: 130,
      total: 140
    },
    intervals: [
      {
        zone: 1,
        length: 180
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 3,
        length: 60
      },
      {
        zone: 4,
        length: 60
      },
      {
        zone: 5,
        length: 60
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 120
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 120
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 120
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 120
      },
      {
        zone: 5,
        length: 120
      },
      {
        zone: 1,
        length: 90
      },
    ],
    timeInSeconds: 1800
  },
  {
    id: 3,
    type: 'pze',
    title: 'Flat Twos',
    metadata: {
      rideCount: 378
    },
    ratings: {
      likes: 600,
      total: 640
    },
    intervals: [
      {
        zone: 1,
        length: 180
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 120
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 2,
        length: 2200
      },
    ],
    timeInSeconds: 2700
  },
  {
    id: 4,
    type: 'pze',
    title: 'Standard Endurance Ride',
    metadata: {
      rideCount: 397
    },
    ratings: {
      likes: 300,
      total: 350
    },
    intervals: [
      {
        zone: 1,
        length: 240
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 60
      },
      {
        zone: 3,
        length: 60
      },
      {
        zone: 1,
        length: 60
      },
      {
        zone: 3,
        length: 300
      },
      {
        zone: 2,
        length: 180
      },
      {
        zone: 3,
        length: 300
      },
      {
        zone: 2,
        length: 180
      },
      {
        zone: 3,
        length: 300
      },
    ],
    timeInSeconds: 1800
  },
  {
    id: 5,
    type: 'pzm',
    title: 'PZ Max Canyon',
    metadata: {
      rideCount: 765
    },
    ratings: {
      likes: 400,
      total: 407
    },
    intervals: [
      {
        zone: 1,
        length: 180
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 30
      },
      {
        zone: 1,
        length: 30
      },
      {
        zone: 2,
        length: 60
      },
      {
        zone: 3,
        length: 60
      },
      {
        zone: 4,
        length: 60
      },
      {
        zone: 5,
        length: 30
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 120
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 180
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 180
      },
      {
        zone: 6,
        length: 45
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 45
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 45
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 45
      },
      {
        zone: 1,
        length: 180
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 6,
        length: 30
      },
      {
        zone: 1,
        length: 180
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 15
      },
      {
        zone: 7,
        length: 15
      },
      {
        zone: 1,
        length: 60
      },
    ],
    timeInSeconds: 2700
  },
]