const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const { query } = require('../db/index')
const { testValidUser } = require('./data');
const {
  deleteUser
} = require('./sqlQueries');

describe('/auth', () => {
  beforeEach(() => {

  })

  afterEach(() => {
    query(deleteUser, [testValidUser.email]);
  })

  it('should create new user with valid credentials', async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testValidUser);

    expect(response.status).to.eql(201);
    expect(response.body).to.have.keys('jwt', 'user');
    expect(response.body.user).to.have.keys('id', 'email', 'username')
  })

  it('should validate user with valid credentials', async () => {
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
  })

  it('should deny user with invalid credentials', async () => {
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