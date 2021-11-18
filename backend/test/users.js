const { expect } = require('chai');
let express = require('express');
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const {
  getRides,
  insertRide,
  deleteRide,
  deleteTestUsers
} = require('./sqlQueries');
const { testValidUser } = require('./data');

describe('Users', () => {
  let jwt, userId

  beforeEach(async () => {
    const { body } = await request(app)
    .post("/auth/register")
    .send(testValidUser);

    jwt = body.jwt;
    userId = body.user.id
  });

  afterEach(async () => {
    await query(deleteTestUsers)
  });

  describe('GET /api/users/lookup', () => {
    it(`should lookup user by username`, async () => {
      await request(app)
        .post("/auth/register")
        .send({
          email: 'test2@user.com',
          password: 'password123',
          username: 'test_search_user'
        });

      const response = await request(app)
        .get(`/api/users/lookup`)
        .query({
          username: 'test'
        })
        .send()
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        });

      expect(response.status).to.eql(200);
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0]).to.have.keys('id', 'username');
    });
  });
});