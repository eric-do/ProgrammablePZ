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

      const getResponseA = await request(app)
        .get("/api/friendships/friends")
        .query({
          user_id: userA.id
        })
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

        const getResponseB = await request(app)
        .get("/api/friendships/followers")
        .query({
          user_id: userB.id
        })
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        })
        .send();

      expect(getResponseA.status).to.eql(200);
      expect(getResponseA.body).to.have.keys('friends');
      expect(getResponseA.body.friends).to.have.lengthOf(1)
      expect(getResponseA.body.friends[0]).to.have.keys('id', 'username');
      expect(getResponseA.body.friends[0].id).to.eql(userB.id);

      expect(getResponseB.status).to.eql(200);
      expect(getResponseB.body).to.have.keys('followers');
      expect(getResponseB.body.followers).to.have.lengthOf(1)

      expect(getResponseB.body.followers[0]).to.have.keys('id', 'username');
      expect(getResponseB.body.followers[0].id).to.eql(userA.id);
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