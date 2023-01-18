const seed = require ('../db/seeds/seed');
const testData = require ('../db/data/test-data/index');
const request = require ('supertest');
const app = require ('../server');
const db = require ('../db/connection');

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe('GET Endpoints', () => {


    
    describe('Generic Error Testing', () => {

        test('When passed in an invalid path, return a 404 status with message', () => {
            return request(app).get('/app')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Page not found, please check your syntax. You entered: /app');
            });
        });

        test('When passed in a path with a broken, server side, function, return a 500 status with message', () => {
            return request(app).get('/api/500error')
            .expect(500)
            .then(({body}) => {
                expect(body.message).toBe('Generic Server Error, please check your request & try again, if this persists contact us.');
            });
        });


    });



    describe('Functionality Testing',  () => {

        describe('getCategories controller', () => {
            
            test('Expect status 200 & a JSON object when /api/categories is called', () => {
                
                return request(app).get('/api/categories')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                
            });
            
            test('Expect the returned JSON object to have both a slug & properties key & has a length of 4', () => {

                return request(app).get('/api/categories')
                .expect(200)
                .then(categoryData => {
                    
                    expect(categoryData.body.categories).toHaveLength(4);
                    categoryData.body.categories.forEach((entry)=> {
                        expect(entry).toHaveProperty('slug');
                        expect(entry).toHaveProperty('description');

                });
            });
                
        });
        
    }); //
        describe('getReviews controller', () => {
            
            test('Expect status 200 & a JSON object when /api/reviews is called', () => {
                
                return request(app).get('/api/reviews')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                
            });
            
            test(`Expect the returned JSON object to have the all of the expected properties`, () => {
                
                return request(app).get('/api/reviews')
                .then(reviewData => {
                    expect(reviewData.body).toHaveLength(13);
                    reviewData.body.forEach(review => {
                        expect(review).toHaveProperty('title', expect.any(String));
                        expect(review).toHaveProperty('designer', expect.any(String));
                        expect(review).toHaveProperty('owner', expect.any(String));
                        expect(review).toHaveProperty('review_img_url', expect.any(String));
                        expect(review).toHaveProperty('review_body', expect.any(String));
                        expect(review).toHaveProperty('category', expect.any(String));
                        expect(review).toHaveProperty('created_at', expect.any(String));
                        expect(review).toHaveProperty('votes', expect.any(Number));
                        expect(review).toHaveProperty('comment_count', expect.any(Number));
                    });
                });
                
            });
            test(`Expect the reviews to be sorted by date in descending order`, () => {
                return request(app).get('/api/reviews')
                .then(({body}) => {
                    
                    expect(body).toBeSortedBy('created_at', {descending: true })
                });
            });
            
        
            });
    });

    describe('getSingleReview', () => {

        test(`Expect the response code to return 200 & a JSON object`, () => {
            return request(app).get('/api/reviews/1')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
        });

        test(`Expect the response to have all the properties found on a review`, () => {
            return request(app).get('/api/reviews/3')
            .then(singleReview => {
    
                singleReview.body.forEach(review => {
                    expect(review).toHaveProperty('title');
                    expect(review).toHaveProperty('review_id');
                    expect(review).toHaveProperty('designer');
                    expect(review).toHaveProperty('owner');
                    expect(review).toHaveProperty('review_img_url');
                    expect(review).toHaveProperty('review_body');
                    expect(review).toHaveProperty('category');
                    expect(review).toHaveProperty('created_at');
                    expect(review).toHaveProperty('votes');
                });
            });
        });

        test(`Expect review_id to be equal to the parametric value passed in`, () => {
            const reviewID = 5;
            return request(app).get(`/api/reviews/${reviewID}`)
            .then(({body}) => {
    
                expect(body[0].review_id).toBe(reviewID);

            })
        });
    });
});


//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
Added npm i jest-sorted as per suggestion.
 Replaced review sorted with jest-sorted.
*/