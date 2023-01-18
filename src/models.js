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



function fetchSingleReview(id) {
    
    return db.query(sqlQueries.singleReviewSQL,[id.review_id])
    .then(review => review.rows);
}


module.exports = {fetchCategories, fetchReviews, fetchSingleReview};

