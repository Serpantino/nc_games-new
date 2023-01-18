const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');



function fetchCategories() {
    return db.query(sqlQueries.gameCategoriesSQL)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviews() {

    return db.query(sqlQueries.getAllReviewsWithCommentCountSQL)
    .then(({rows}) => {
        return rows;
    })
}



module.exports = {fetchCategories, fetchReviews};

