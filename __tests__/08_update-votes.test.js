const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});


describe.skip('PATCH endpoints', () => {

  describe('Update Vote Count in reviews', () => {

    describe('Error Testing', () => {

    });
  });

//   describe('Working test', () => {

//     return request(app).patch('/api/reviews/1'.send({inc_votes: 100})
//     .expect(201)
//     .then(() => {})
//     });
});