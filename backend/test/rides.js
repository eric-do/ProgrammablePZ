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

  const insertRideToDB = async ride => {
    const {
      type,
      title,
      timeInSeconds,
      intervals
    } = testRide;

    return await query(insertRide, [
      type,
      title,
      timeInSeconds,
      JSON.stringify(intervals)
    ]);
  }

  const postRide = async ride => {
    return await request(app)
      .post("/api/rides")
      .send({ ride })
      .set({
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
      });
  }

  after(() => {
    return query(deleteTestUsers)
  })

  afterEach(() => {
    return query(deleteRide, [testRide.title]);
  })

  describe("GET /api/rides", () => {
    it("Should respond to the GET method", async () => {
      await insertRideToDB(testRide)
      const rows = await query('SELECT creator_id, title FROM rides')
      const response = await request(app).get("/api/rides");
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an.instanceOf(Array)
      expect(response.body[0]).to.have.keys(
        'title', 'type', 'metadata',
        'ratings', 'intervals', 'timeInSeconds', 'id'
      );
    });

    it("Should handle pagination using sort", async () => {
      const [{ id: firstId }] = await insertRideToDB(testRide)
      const [{ id: secondId }] = await insertRideToDB(testRide)
      const [{ id: thirdId }] = await insertRideToDB(testRide)

      const firstResponse = await request(app).get(`/api/rides`);
      const secondResponse = await request(app).get(`/api/rides?limit=1&offset=2`);

      expect(firstResponse.body[0].id).to.eql(thirdId)
      expect(secondResponse.body[0].id).to.eql(firstId)
    })

    it("Should respond with rides filtered by ride type", async () => {
      await insertRideToDB({
        ...testRide,
        type: 'pz'
       });

      await insertRideToDB({
      ...testRide,
      type: 'pze'
      })

      const response = await request(app).get("/api/rides?type=pz");
      const validateType = ride => ride.type === 'pz'

      expect(response.status).to.eql(200);
      expect(response.body.every(validateType)).to.eql(true);
    })

    it("Should respond with rides filtered by ride length", async () => {
      await insertRideToDB({
        ...testRide,
        timeInSeconds: 2700
       });

      await insertRideToDB({
      ...testRide,
      timeInSeconds: 1800
      });

      const response = await request(app).get("/api/rides?timeInSeconds=2700");
      const validateLength = ride => ride.timeInSeconds === 2700;

      expect(response.status).to.eql(200);
      expect(response.body.every(validateLength)).to.eql(true);
    })

    it("Should respond with the correct number of rides using limit", async () => {
      for (let i = 0; i < 5; i++) {
        await insertRideToDB(testRide);
      }

      const response = await request(app).get("/api/rides?limit=3");
      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(3);
    })

    it("Should respond with rides filtered by user", async () => {
      await postRide(testRide);

      const response = await request(app).get(`/api/rides?user=${testValidUser.username}`);
      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(1);
    })
  })

  describe("POST /api/rides", () => {

    it("should successfully add ride from authenticated user", async () => {
      const response = await postRide(testRide);

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
                              .send({ ride: testRide })

      expect(response.status).to.eql(401);
    });
  })

  describe("GET /api/rides/:id", () => {

    it("Should respond to the GET method", async () => {
      const [ { id } ] = await insertRideToDB(testRide);
      const response = await request(app).get(`/api/rides/${id}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.have.keys(
        'title', 'type', 'metadata',
        'ratings', 'intervals', 'timeInSeconds', 'id'
      );
    });

    it("Should increment ride count", async () => {
      const [ { id } ] = await insertRideToDB(testRide);

      const { body: oldRide } = await request(app).get(`/api/rides/${id}`);
      expect(oldRide.metadata.rideCount).to.eql(0)

      await request(app).post(`/api/rides/${id}/ride-count`);

      const { body: newRide } = await request(app).get(`/api/rides/${id}`);
      expect(newRide.metadata.rideCount).to.eql(1)
    });
  })
})

