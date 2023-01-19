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

describe('temp', () => {
    test('expect nothing', () => {

    });
})
describe('PATCH endpoints', () => {

  describe('Update Vote Count in reviews', () => {

    describe('Error Testing', () => {

    });
  });

  describe('Functionality Tests', () => {

    test(`Check review votes has been increased from 1 to 101.`, () => {
        return request(app).get('/api/reviews/1')
        .then(({body}) => {
            
            expect(body.review[0].votes).toBe(1);
        }).then(() => {
    
            return request(app).patch('/api/reviews/1').send({inc_votes: 100})
            .expect(201)
            .then(({body}) => {
                
                expect(body.updatedReview[0].votes).toBe(101);
            });
        });
    });

    test(`Check review votes has been decreased from 100 to 1.`, () => {
        return request(app).get('/api/reviews/12')
        .then(({body}) => {
            
            expect(body.review[0].votes).toBe(100);
        }).then(() => {
    
            return request(app).patch('/api/reviews/12').send({inc_votes: -99})
            .expect(201)
            .then(({body}) => {
                
                expect(body.updatedReview[0].votes).toBe(1);
            });
        });
    });
});
});