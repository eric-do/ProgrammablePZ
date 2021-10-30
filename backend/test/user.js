const { expect } = require('chai');
let express = require('express');
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testRide, testValidUser } = require('./data');
const {
  getRides,
  insertRide,
  deleteRide,
  deleteTestUsers
} = require('./sqlQueries');

describe('User rides', () => {
  let jwt, userId, ride;
  beforeEach(async () => {
    let { body: { jwt, user} } = await request(app)
    .post("/auth/register")
    .send(testValidUser);

    let response = await request(app)
    .post("/api/rides")
    .send({ ride: testRide })
    .set({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    });

    ride = response.body.ride
    userId = user.id
  })

  afterEach(async () => {
    await query(deleteTestUsers)
    return query(deleteRide, [testRide.title]);
  })

  describe('POST /api/users/:id/rides_taken', () => {
    it(`should add ride to user's taken rides`, async () => {
      const postResponse = await request(app)
        .post(`/api/users/${userId}/rides_taken`)
        .send({
          rideId: ride.id
        })
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        });

      expect(postResponse.status).to.eql(201);

      const getResponse = await request(app)
        .get(`/api/users/${userId}/rides_taken`);

      expect(getResponse.status).to.eql(200);
      expect(getResponse.body.length).to.eql(1)
      expect(getResponse.body[0]).to.have.keys(
        'title', 'type', 'metadata',
        'ratings', 'intervals', 'timeInSeconds', 'id'
      );
    })
  })
})