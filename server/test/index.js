const { expect } = require('chai');
let express = require('express'); // (npm install --save express)
let request = require('supertest');
const app = require('../app');

describe("/api/rides", () => {
  it("It should response the GET method", async () => {
    const response = await request(app).get("/api/rides");
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an.instanceOf(Array)
    expect(response.body[0]).to.have.keys(
      'title', 'type', 'metadata',
      'ratings', 'intervals', 'timeInSeconds'
    );
  });
});