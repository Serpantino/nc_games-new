//=====================//
//=====CONTROLLER=====//
//=====================//

const getgames = (request, response, next) => {
    
    const {category, sort_by}= request.query; //Extrac  ting from the request query params the client passed into the URL.
    selectgames(category, sort_by)
    .then((games) => {
        response.status(200).send({games});
    })
    .catch((error) => {
        next(error);
    })
}


//================//
//=====MODEL=====//
//================//

    const selectgames = (category, sort_by=`game_id`) => {
        const acceptedSortBys = [`game_id`, `price`]; //This is the greenlist of accepted string parameters from the url query
        const queryValues = []; //This table is to pass those values into the main SQL string for db.query
    


    let queryString = `
    SELECT games.*, game_categories.category_name AS category
    FROM games
    JOIN game_categories
    ON games.category__id = game_categoies.category_id`; //This is the base SQL string to be built upon based on queries.

 if (category !== undefined) {
    queryString += `WHERE game_categories.category_name = $1`; //Adding a line to the base query if a category query is passed in.
    queryValues.push(category); //Add 
 }

 queryString += `ORDER BY ${sort_by} DESC`; //This is where we need the string literal

 if(!acceptedSortBys.includes(sort_by)) {
    return Promise.reject({status: 400, msg: 'Bad Request, invalid sort criteria'}) //Return if the sort_by value the client passes in doesn't match the greenlist.
 }

 return db.query(queryString, queryValues).then( ({rows}) => {
    return rows;
 })

}
//=============================================//
//=====Jest test with Supertest example ======//
//===========================================//

describe('sortByQuery', => {
    test('Successful test', () => {
        return request(app)
        .get('/api/games?category=rpg&sort_by=price')
        .expect(200)
        .then(({body: {games}}) => {
            expect(games[0].price).toBe(150);
            expect(games[games.length -1].price).toBe(300)
        })
    });
    test('Failed Test (When passed in an invalid request)', () => {
        .get('api/games?sort_by=poodles')
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe('Bad Request, invalid sort criteria')
        })
    })
})