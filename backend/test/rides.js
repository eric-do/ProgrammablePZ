const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');
const user = require('./auth')
const { query } = require('../db/index')
const { testRide, testValidUser } = require('./data');
const {
  getRides,
  insertRide,
  deleteRide,
  deleteTestUsers
} = require('./sqlQueries');

describe('Rides', () => {
  let jwt;

  before(async () => {
    const { body } = await request(app)
        .post("/auth/register")
        .send(testValidUser);

    jwt = body.jwt;
  })

  after(() => {
    return query(deleteTestUsers)
  })

  afterEach(() => {
    return query(deleteRide, [testRide.title]);
  })

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

    it("should successfully add ride from authenticated user", async () => {
      const response = await request(app)
                              .post("/api/rides")
                              .send(testRide)
                              .set({
                                'Authorization': 'Bearer ' + jwt,
                                'Content-Type': 'application/json'
                              });

      expect(response.status).to.eql(201);
      expect(response.body).to.have.keys('ride');
      expect(response.body.ride).to.have.keys(
        'title', 'type', 'metadata',
        'ratings', 'intervals', 'timeInSeconds', 'id'
      );
    });

    it("should fail adding ride from unauthenticated user", async () => {
      const response = await request(app)
                              .post("/api/rides")
                              .send(testRide)

      expect(response.status).to.eql(401);
    });
  })

  describe("GET /api/rides/:id", () => {

    it("Should respond to the GET method", async () => {
      const insertResponse = await request(app)
                              .post("/api/rides")
                              .send(testRide)
                              .set({
                                'Authorization': 'Bearer ' + jwt,
                                'Content-Type': 'application/json'
                              });

      const { id } = insertResponse.body.ride;
      const response = await request(app).get(`/api/rides/${id}`);
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
  })
})

