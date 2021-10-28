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
  let jwt, user, ride;
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
  })

  afterEach(async () => {
    await query(deleteTestUsers)
    return query(deleteRide, [testRide.title]);
  })

  describe('POST /api/user/rides', () => {
    it(`should add ride to user's taken rides`, async () => {
      console.log(ride.id)
      const response = await request(app)
        .post(`/api/user/rides`)
        .send({
          rideId: ride.id
        })
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        });
      expect(response.status).to.eql(201);
    })
  })
})