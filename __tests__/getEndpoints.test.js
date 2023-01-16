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
                // console.log('categoryData:', categoryData.body);
                expect(categoryData.body).toHaveLength(4);
                categoryData.body.forEach((entry)=> {
                    console.log('Looking at===>', entry);
                    expect(entry).toHaveProperty('slug');
                    expect(entry).toHaveProperty('description');

                });
            });
                
        });

    });
});
