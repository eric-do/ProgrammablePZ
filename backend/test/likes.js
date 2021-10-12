const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testValidUser, testRide } = require('./data');
const {
  deleteTestUsers,
  deleteRideLikes,
  deleteRide
} = require('./sqlQueries');

describe('Likes', () => {
  let jwt;

  before(async () => {
    const { body } = await request(app)
        .post("/auth/register")
        .send(testValidUser);

    jwt = body.jwt;
  })

  after(() => {
    return query(deleteTestUsers)
  })

  describe('POST /api/ride/like', () => {

    afterEach(() => {
      return Promise.all([
        query(deleteRideLikes),
        query(deleteRide, [testRide.title])
      ])
    })

    it('should increment ride likes', async () => {

      const addRideResponse = await request(app)
        .post("/api/rides")
        .send({ ride: testRide })
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        });

      const { ride } = addRideResponse.body;

      const addLikeResponse = await request(app)
        .post("/api/rides/like")
        .query({ rideId: ride.id})
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        })

      const updatedRideResponse = await request(app)
        .get(`/api/rides/${ride.id}`)

      const updatedRide = updatedRideResponse.body.ride;

      expect(addLikeResponse.status).to.eql(200);
      expect(updatedRide.ratings.likes).to.eql(1)
      expect(updatedRide.ratings.total).to.eql(1)
    })
  })
})