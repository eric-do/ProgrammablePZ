const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testValidUser } = require('./data');
const {
  deleteTestUsers,
  deleteRideLikes
} = require('./sqlQueries');

describe('Authentication', () => {

  afterEach(async () => {
    await query(deleteRideLikes)
    await query(deleteTestUsers);
  })

  describe('POST /auth/register', () => {
    it('should create new user with valid credentials', async () => {
      const response = await request(app)
        .post("/auth/register")
        .send(testValidUser);

      expect(response.status).to.eql(201);
      expect(response.body).to.have.keys('jwt', 'user');
      expect(response.body.user).to.have.keys('id', 'email', 'username')
    })

    it('should deny registration with an unavailable username', async () => {
      await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const response = await request(app)
        .post("/auth/register")
        .send(testValidUser);

      expect(response.status).to.eql(409);
      expect(response.body.error).to.eql('Username or email are unavailable.');
    })
  })

  describe('POST /auth/login', () => {
    it('should login user with valid login credentials', async () => {
      await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const response = await request(app)
        .post("/auth/login")
        .send(testValidUser);

      expect(response.status).to.eql(200);
      expect(response.body).to.have.keys('jwt', 'user');
      expect(response.body.user).to.have.keys('id', 'email', 'username')
    })

    it('should allow case insensitive login', async () => {
      await request(app)
        .post("/auth/register")
        .send({
          ...testValidUser,
          username: 'Test_User'
        });

      const response = await request(app)
      .post("/auth/login")
      .send(testValidUser);

      expect(response.status).to.eql(200);
      expect(response.body).to.have.keys('jwt', 'user');
      expect(response.body.user).to.have.keys('id', 'email', 'username')
    })

    it('should deny user with invalid login credentials', async () => {
      await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const response = await request(app)
        .post("/auth/login")
        .send({
          ...testValidUser,
          password: 'invalid_password'
        });

      expect(response.status).to.eql(401);
      expect(response.body.error).to.eql('Invalid username or password.');
    })
  })

  describe('GET /auth/validate', () => {
    it('should validate user with valid token', async () => {
      const registerResponse = await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const { jwt } = registerResponse.body;

      const validateResponse = await request(app)
        .get("/auth/validate")
        .set({
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        })

      expect(validateResponse.status).to.eql(200);
      expect(validateResponse.body).to.have.keys('jwt', 'user');
      expect(validateResponse.body.jwt).to.be.a('string')
      expect(validateResponse.body.user).to.have.keys(
        'id',
        'username',
        'email',
        'iat',
        'exp'
      );
    })

    it('should deny user with invalid token', async () => {
      const registerResponse = await request(app)
        .post("/auth/register")
        .send(testValidUser);

      const { jwt } = registerResponse.body;

      const validateResponse = await request(app)
        .get("/auth/validate")
        .set({
          'Authorization': 'Bearer ' + 'faketoken',
          'Content-Type': 'application/json'
        })

      expect(validateResponse.status).to.eql(401);
    })
  })
})