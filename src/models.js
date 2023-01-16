const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');


function fetchCategories() {
    
    return db.query(sqlQueries.gameCategories)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviews() {

    return db.query(sqlQueries.gameReviews)
    .then(gameReviews => {
        return gameReviews.rows;
    })
}


module.exports = {fetchCategories, fetchReviews};