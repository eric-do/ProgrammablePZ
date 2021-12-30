const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testRide, testValidUser } = require('./data');
const {
  deleteTestUsers,
} = require('./sqlQueries');

const addFriendship = (userJwt, friendId) => (
  request(app)
    .post("/api/friendships/create")
    .query({
      user_id: friendId
    })
    .set({
      'Authorization': 'Bearer ' + userJwt,
      'Content-Type': 'application/json'
    })
    .send()
)

const destroyFriendship = (userJwt, friendId) => (
  request(app)
    .post("/api/friendships/destroy")
    .query({
      user_id: friendId
    })
    .set({
      'Authorization': 'Bearer ' + userJwt,
      'Content-Type': 'application/json'
    })
    .send()
)

const getFriends = (id, jwt) => (
  request(app)
    .get("/api/friendships/friends")
    .query({
      user_id: id
    })
    .set({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    })
    .send()
)

const getFollowers = (id, jwt) => (
  request(app)
    .get("/api/friendships/followers")
    .query({
      user_id: id
    })
    .set({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    })
    .send()
)

const getFriendshipMeta = (id, jwt) => (
  request(app)
    .get("/api/friendships/metadata")
    .query({
      user_id: id
    })
    .set({
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json'
    })
    .send()
)

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
      const addResponse = await addFriendship(jwtA, userB.id)
      expect(addResponse.status).to.eql(201);
      expect(addResponse.body).to.have.keys('id', 'username');

      const friendsResponse = await getFriends(userA.id, jwtA);
      const followersResponse = await getFollowers(userB.id, jwtB);
      const metadataResponse = await getFriendshipMeta(userA.id, jwtA);
      const lookupResponse = await request(app)
        .get(`/api/users/lookup`)
        .query({
          username: userB.username
        })
        .send()
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        });

      expect(friendsResponse.status).to.eql(200);
      expect(friendsResponse.body).to.have.lengthOf(1)
      expect(friendsResponse.body[0]).to.have.keys('id', 'username', 'is_friend');
      expect(friendsResponse.body[0].id).to.eql(userB.id);

      expect(followersResponse.status).to.eql(200);
      expect(followersResponse.body).to.have.lengthOf(1)
      expect(followersResponse.body[0]).to.have.keys('id', 'username', 'is_friend');
      expect(followersResponse.body[0].id).to.eql(userA.id);
      expect(followersResponse.body[0].is_friend).to.eql(false);

      expect(metadataResponse.status).to.eql(200);
      expect(metadataResponse.body).to.have.keys(
        'friend_count',
        'follower_count'
      );
      expect(metadataResponse.body.friend_count).to.eql(1)
      expect(metadataResponse.body.follower_count).to.eql(0)

      expect(lookupResponse.body[0].is_friend).to.eql(true)
    })

    it('should not add duplicate friendships', async () => {
      await addFriendship(jwtA, userB.id)
      const addResponse = await addFriendship(jwtA, userB.id)
      const getResponse = await getFriends(userA.id, jwtA);
      const lookupResponse = await request(app)
        .get(`/api/users/lookup`)
        .query({
          username: userB.username
        })
        .send()
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        });

      expect(addResponse.status).to.eql(400);
      expect(getResponse.status).to.eql(200);
      expect(lookupResponse.status).to.eql(200);
      expect(getResponse.body).to.have.lengthOf(1)
      expect(lookupResponse.body).to.have.lengthOf(1)
    })
  })

  describe('POST /api/friendships/destroy', () => {
    it('should remove friendship', async () => {
      const addResponse = await addFriendship(jwtA, userB.id);
      const destroyResponse = await destroyFriendship(jwtA, userB.id)
      const friendsResponse = await getFriends(userA.id, jwtA);
      const followersResponse = await getFollowers(userB.id, jwtB);
      const metadataResponse = await getFriendshipMeta(userA.id, jwtA);
      const lookupResponse = await request(app)
        .get(`/api/users/lookup`)
        .query({
          username: userB.username
        })
        .send()
        .set({
          'Authorization': 'Bearer ' + jwtA,
          'Content-Type': 'application/json'
        });

        expect(destroyResponse.status).to.eql(201);
        expect(friendsResponse.body).to.have.lengthOf(0);
        expect(followersResponse.body).to.have.lengthOf(0);
        expect(metadataResponse.body.friend_count).to.eql(0);
        expect(lookupResponse.body[0].is_friend).to.eql(false)
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
        .get("/api/me/timeline")
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