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
                    
                    expect(categoryData.body).toHaveLength(4);
                    categoryData.body.forEach((entry)=> {
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
                        expect(review).toHaveProperty('title');
                        expect(review).toHaveProperty('designer');
                        expect(review).toHaveProperty('owner');
                        expect(review).toHaveProperty('review_img_url');
                        expect(review).toHaveProperty('review_body');
                        expect(review).toHaveProperty('category');
                        expect(review).toHaveProperty('created_at');
                        expect(review).toHaveProperty('votes');
                    })
                })
                
            });
            test(`Expect the reviews to be sorted by date in descending order`, () => {
                return request(app).get('/api/reviews')
                .then(({body}) => {
                    
                    expect(body).toBeSortedBy('created_at', {descending: true })
                    // expect(body[0].created_at).toBe('2021-01-25T11:16:54.963Z');
                    // expect(body[12].created_at).toBe('1970-01-10T02:08:38.400Z');
                    
                })
            });
            
            test(`Expect the returned JSON object to also have the property of comment_count`, () => {
                return request(app).get('/api/reviews')
                .then(({body}) => {
                    body.forEach(review => {
                        expect(review).toHaveProperty('comment_count');
                    })
                })
            });
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