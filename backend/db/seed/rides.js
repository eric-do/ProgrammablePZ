require('dotenv').config()
process.env.DATABASE_URL = 'postgres://postgres:student@localhost:5431/ppz'
const { query } = require('../');
const { rides } = require('./data');

const USER_COUNT =  447391;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const insertRides = async (count = 200000) => {
  let rideCount = 0;
  const q = `
    INSERT INTO rides (
      type,
      title,
      ride_count,
      likes,
      total_votes,
      timeInSeconds,
      intervals,
      creator_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < rides.length; j++) {
      const ride = rides[j];

      try {
        await query(q, [
          ride.type,
          `${ride.title} ${rideCount}`,
          ride.metadata.rideCount,
          ride.ratings.likes,
          ride.ratings.total,
          ride.timeInSeconds,
          JSON.stringify(ride.intervals),
          getRandomInt(1, USER_COUNT)
        ]);

        rideCount += 1;

        if (rideCount % 10000 === 0) console.log(rideCount);
      } catch (e) {
        console.log(e)
      }
    }
    console.log('done adding rides');
  }
}

const setAdminRides = async (count = 10000) => {
  let rideCount = 0;
  const q = `
    UPDATE rides
    SET creator_id = NULL
    WHERE id = $1
  `

  for (let i = 0; i < count; i++) {
    try {
      await query(q, [getRandomInt(1, 1000000)]);
      rideCount += 1;
      if (rideCount % 1000 === 0) console.log(rideCount);
    } catch (e) {
      console.log(e)
    }
  }
  console.log('done setting admin rides');
}

const initializeRides = async () => {
  await insertRides(0);
  await setAdminRides();
  console.log('done');
}
initializeRides()