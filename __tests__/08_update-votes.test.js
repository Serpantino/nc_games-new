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

describe("PATCH endpoints", () => {

  describe("Update Vote Count in reviews", () => {

    describe("Error Testing", () => {
      test(`Expect a 404 response when the review_id to patch doesn't exist`, () => {
        return request(app)
          .patch("/api/reviews/42000")
          .send({ inc_votes: 66 })
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe("review_id not found");
          });
      });

      test(`Expect a 400 response when the review_id to patch is invalid`, () => {
        return request(app)
          .patch("/api/reviews/kumquat")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe(
              "Bad Request, review_id must be a number"
            );
          });
      });

      test(`Expect a 400 response when the data type is invalid`, () => {
        return request(app)
        .patch("/api/reviews/2")
        .send({inc_votes: 'vvv'})
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe("Bad request, invalid data type");
        });
      });
      test(`Expect a 400 response when the data key is invalid`, () => {
        return request(app)
        .patch("/api/reviews/3")
        .send({pinky: 'brain'})
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe("Bad Request, Invalid Key");
        });
      });
    });
  });

  describe("Functionality Tests", () => {
    test(`Check review votes has been increased from 1 to 101.`, () => {
      return request(app)
        .get("/api/reviews/1")
        .then(({ body }) => {
          expect(body.review[0].votes).toBe(1);
        })
        .then(() => {
          return request(app)
            .patch("/api/reviews/1")
            .send({ inc_votes: 100 })
            .expect(201)
            .then(({ body }) => {
              expect(body.updatedReview[0].votes).toBe(101);
            });
        });
    });

    test(`Check review votes has been decreased from 100 to 1.`, () => {
      return request(app)
        .get("/api/reviews/12")
        .then(({ body }) => {
          expect(body.review[0].votes).toBe(100);
        })
        .then(() => {
          return request(app)
            .patch("/api/reviews/12")
            .send({ inc_votes: -99 })
            .expect(201)
            .then(({ body }) => {
              expect(body.updatedReview[0].votes).toBe(1);
            });
        });
    });

    test(`When passed in a fractional number, round it to the nearest whole & update`, () => {
      return request(app)
        .get("/api/reviews/1")
        .then(({ body }) => {
          expect(body.review[0].votes).toBe(1);
        })
        .then(() => {
          return request(app)
            .patch("/api/reviews/1")
            .send({ inc_votes: 1.35 })
            .expect(201)
            .then(({ body }) => {
              expect(body.updatedReview[0].votes).toBe(2);
            })
            .then(() => {
              return request(app)
                .patch("/api/reviews/1")
                .send({ inc_votes: 1.51 })
                .expect(201)
                .then(({ body }) => {
                  expect(body.updatedReview[0].votes).toBe(4);
                })
                .then(() => {
                    return request(app)
                    .patch("/api/reviews/1")
                    .send({inc_votes: -1.2})
                    .expect(201)
                    .then(({body}) => {
                        expect(body.updatedReview[0].votes).toBe(3);
                    });
                });
            });
        });
    });
    test(`When passed in a number as a string, coerce it & return the updated review votes`, () => {

        return request(app)
        .patch("/api/reviews/1")
        .send({ inc_votes: "5"})
        .expect(201)
        .then(({body}) => {
            expect(body.updatedReview[0].votes).toBe(6)
        });
    });
  });
});
