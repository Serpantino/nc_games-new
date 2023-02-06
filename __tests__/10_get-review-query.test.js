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

        test.only('Expect the dexterity category to be returned when the requested query is categories=dexterity' , () => {

            return request(app).get('/api/reviews?categories=dexterity')
            .expect(200)
            .then(({body}) => {
                console.log(body);
                expect(body.results).toHaveProperty('category');
                expect(body.category).toBe('dexterity');
            });
        });

        test('Expect all reviews to be returned when requested with categories but no query value', () => {

            return request(app).get('/api/reviews?categories')
            .expect(200)
            .then(({body}) => {
                console.log(body.results);
            })
        });

        test('Expect the reviews to be sorted by date if sort_by is queried without a value', () => {

            return request(app).get('/api/reviews?sort_by')
            .expect(200)
            
        });

    });
});