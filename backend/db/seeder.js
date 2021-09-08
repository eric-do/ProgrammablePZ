require('dotenv').config()
const { query } = require('./');
const { rides } = require('./data');

const bulkInsert = rides => {
  const q = `
    INSERT INTO rides (
      type, title, ride_count,
      likes, total_votes, timeInSeconds,
      created_on, intervals
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7);
  `
  const promises = rides.map(ride => (
    query(q, [
      ride.type,
      ride.title,
      ride.metadata.rideCount,
      ride.ratings.likes,
      ride.ratings.total,
      ride.timeInSeconds,
      JSON.stringify(ride.intervals)
    ])
  ))

  Promise.all(promises)
    .then(() => console.log('added'))
    .catch(() => console.log('error'))
}

bulkInsert(rides);