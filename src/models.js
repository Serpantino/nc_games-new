const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');


function fetchCategories() {
    return db.query(sqlQueries.sqlCategories)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviewComments(id) {
    return db.query(sqlQueries.fetchReviewComments, [id.review_id])
    .then(reviewComments => {
        return reviewComments.rows;
    })
}

module.exports = {fetchCategories, fetchReviewComments};