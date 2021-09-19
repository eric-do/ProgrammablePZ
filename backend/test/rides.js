const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const user = require('./auth')
const { query } = require('../db/index')
const { testRide } = require('./data');
const {
  getRides,
  insertRide,
  deleteRide
} = require('./sqlQueries');

describe("GET /api/rides", () => {
  it("Should respond to the GET method", async () => {
    const response = await request(app).get("/api/rides");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an.instanceOf(Array)
    expect(response.body[0]).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds', 'id'
    );
  });

  it("Should respond with rides filtered by ride type", async () => {
    const response = await request(app).get("/api/rides?type=pz");
    const validateType = ride => ride.type === 'pz'

    expect(response.status).to.eql(200);
    expect(response.body.every(validateType)).to.eql(true);
  })

  it("Should respond with rides filtered by ride length", async () => {
    const response = await request(app).get("/api/rides?timeInSeconds=2700");
    const validateLength = ride => ride.timeInSeconds === 2700;

    expect(response.status).to.eql(200);
    expect(response.body.every(validateLength)).to.eql(true);
  })

  it("Should respond with the correct number of rides using limit", async () => {
    const response = await request(app).get("/api/rides?limit=3");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eql(3);
  })
})

describe("POST /api/rides", () => {
  it("should successfully add new ride", async () => {
    const response = await request(app)
                             .post("/api/rides")
                             .send(testRide);
    expect(response.status).to.eql(201);
    expect(response.body).to.have.keys('ride');
    expect(response.body.ride).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds', 'id'
    );
  });
})

describe("/api/rides/:id", () => {
  beforeEach(async () => {

  });

  afterEach(async () => {
    await query(deleteRide, [testRide.title])
  })

  it("Should respond to the GET method", async () => {
    const response = await request(app).get("/api/rides/11");
    expect(response.status).to.eql(200);
    expect(response.body).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds', 'id'
    );
  });

  it("Should increment ride count", async () => {
    const oldRows = await query(getRides);
    const oldCount = oldRows.length;

    const rows = await query(insertRide, [
      testRide.type,
      testRide.title,
      testRide.metadata.rideCount,
      testRide.ratings.likes,
      testRide.ratings.total,
      testRide.timeInSeconds,
      JSON.stringify(testRide.intervals)
    ]);

    const id = rows[0].id;

    const { body: oldRide } = await request(app).get(`/api/rides/${id}`);
    expect(oldRide.metadata.rideCount).to.eql(0)

    await request(app).post(`/api/rides/${id}/ride-count`);

    const { body: newRide } = await request(app).get(`/api/rides/${id}`);
    expect(newRide.metadata.rideCount).to.eql(1)
  });

  it("Should increment ride likes", async () => {
    const oldRows = await query(getRides);
    const oldCount = oldRows.length;

    const rows = await query(insertRide, [
      testRide.type,
      testRide.title,
      testRide.metadata.rideCount,
      testRide.ratings.likes,
      testRide.ratings.total,
      testRide.timeInSeconds,
      JSON.stringify(testRide.intervals)
    ]);

    const id = rows[0].id;

    const { body: oldRide } = await request(app).get(`/api/rides/${id}`);
    expect(oldRide.ratings.likes).to.eql(0)

    await request(app).post(`/api/rides/${id}/likes`);

    const { body: newRide } = await request(app).get(`/api/rides/${id}`);
    expect(newRide.ratings.likes).to.eql(1)
  });
})