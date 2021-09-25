const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testValidUser, testRide } = require('./data');
const {
  deleteTestUsers,
  truncateRideLikes,
  deleteRide
} = require('./sqlQueries');

describe('Likes', () => {
  describe('POST /api/ride/like', () => {
    beforeEach(() => {

    })

    afterEach(() => {
      return Promise.all([
        query(truncateRideLikes),
        query(deleteTestUsers),
        query(deleteRide, [testRide.title])
      ])
    })

    it('should increment ride likes', async () => {
      const registerResponse = await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const { jwt } = registerResponse.body;

      const addRideResponse = await request(app)
        .post("/api/rides")
        .send(testRide)
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

      const updatedRide = updatedRideResponse.body;

      expect(addLikeResponse.status).to.eql(200);
      expect(updatedRide.ratings.likes).to.eql(1)
      expect(updatedRide.ratings.total).to.eql(1)
    })
  })
})