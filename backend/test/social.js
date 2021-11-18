const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testRide, testValidUser } = require('./data');
const {
  deleteTestUsers,
} = require('./sqlQueries');

describe('Social interactions', () => {
  let jwtA, jwtB, userA, userB;

  const userCredentialsA = {
    email: 'test1@user.com',
    password: 'password123',
    username: 'test1_user'
  };

  const userCredentialsB = {
    email: 'test2@user.com',
    password: 'password123',
    username: 'test2_user'
  };

  beforeEach(async () => {
    const responseA = await request(app)
      .post("/auth/register")
      .send(userCredentialsA);

    const responseB = await request(app)
      .post("/auth/register")
      .send(userCredentialsB);

    jwtA = responseA.body.jwt;
    userA = responseA.body.user;
    jwtB = responseB.body.jwt;
    userB = responseB.body.user;
  })
  afterEach(async () => {
    await query(deleteTestUsers);
  })

  describe('POST /api/friendships/create', () => {
    it('successfully adds friendship by user_id', async () => {
      const addResponse = await request(app)
        .post("/api/friendships/create")
        .query({
          user_id: userB.id
        })
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

      expect(addResponse.status).to.eql(201);
      expect(addResponse.body).to.have.keys('id', 'username');

      const getResponse = await request(app)
        .get("/api/friendships/ids")
        .query({
          user_id: userA.id
        })
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

      expect(getResponse.status).to.eql(200);
      expect(getResponse.body).to.have.keys('friends');
      expect(getResponse.body.friends).to.have.lengthOf(1)
      expect(getResponse.body.friends[0].friend_id).to.eql(userB.id);
    })
  })

  describe('GET /api/timeline/', () => {
    it('successfully gets user timeline', async () => {
      await request(app)
        .post("/api/friendships/create")
        .query({
          user_id: userB.id
        })
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

      await request(app)
        .post("/api/rides")
        .send({ ride: testRide })
        .set({
          'Authorization': 'Bearer ' + jwtB,
          'Content-Type': 'application/json'
        });

      await request(app)
      .post("/api/rides")
      .send({ ride: testRide })
      .set({
        'Authorization': 'Bearer ' + jwtB,
        'Content-Type': 'application/json'
      });


      const response = await request(app)
        .get("/api/timeline")
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

      expect(response.status).to.eql(200);
      expect(response.body).to.have.lengthOf(2);
    })
  })
})