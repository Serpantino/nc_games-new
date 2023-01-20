const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data/index");
const app = require("../server");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('getReviewQuery', () => {

    describe('Error Testing', () => {

    });

    describe('Functionality Testing', () => {

        test('generic' , () => {

            return request(app).get('/api/reviews?categories')
            .expect(200)
        });
    });
})