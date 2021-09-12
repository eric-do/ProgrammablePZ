const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../server/app');

describe("/api/rides", () => {
  it("It should respond to the GET method", async () => {
    const response = await request(app).get("/api/rides");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an.instanceOf(Array)
    expect(response.body[0]).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds', 'id'
    );
  });

  it("It should respond with rides filtered by ride type", async () => {
    const response = await request(app).get("/api/rides?type=pz");
    const validateType = ride => ride.type === 'pz'

    expect(response.status).to.eql(200);
    expect(response.body.every(validateType)).to.eql(true);
  })

  it("It should respond with rides filtered by ride length", async () => {
    const response = await request(app).get("/api/rides?timeInSeconds=2700");
    const validateLength = ride => ride.timeInSeconds === 2700;

    expect(response.status).to.eql(200);
    expect(response.body.every(validateLength)).to.eql(true);
  })

  it("It should respond with the correct number of rides using limit", async () => {
    const response = await request(app).get("/api/rides?limit=3");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eql(3);
  })
})

describe("/api/rides/:id", () => {
  it("It should respond to the GET method", async () => {
    const response = await request(app).get("/api/rides/11");
    expect(response.status).to.eql(200);
    expect(response.body).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds', 'id'
    );
  });
})