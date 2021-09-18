const testRide = {
  type: 'pz',
  title: 'Test ride',
  metadata: {
    rideCount: 0
  },
  ratings: {
    likes: 0,
    total: 0
  },
  intervals: [
    {
      zone: 1,
      length: 180
    },
  ],
  timeInSeconds: 180
};

const testValidUser = {
  email: 'test@user.com',
  password: 'password123',
  username: 'test_user'
}

module.exports = { testRide, testValidUser };