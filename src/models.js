const db = require("../db/connection");
const sqlQueries = require("../src/sqlQueries");


function fetchCategories() {
  return db.query(sqlQueries.gameCategoriesSQL).then((gameCategories) => {
    return gameCategories.rows;
  });
}

function fetchReviews() {
  return db
    .query(sqlQueries.getAllReviewsWithCommentCountSQL)
    .then(({ rows }) => {
      return rows;
    });
}

function fetchSingleReview(id) {
  if (isNaN(parseInt(id))) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, review_id must be a number",
    });
  }
  return db.query(sqlQueries.singleReviewSQL, [id]).then((review) => {
    if (review.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "review_id not found",
      });
    }

    return review.rows;
  });
}

function fetchReviewComments(id) {
  if (isNaN(parseInt(id))) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, review_id must be a number",
    });
  }

  return fetchSingleReview(id)
    .then(() => {
      return db.query(sqlQueries.fetchReviewCommentsSQL, [id]);
    })
    .then((reviewComments) => {
      return reviewComments.rows;
    });
}


function updateReviewVotes(id, value) {
    const voteUpdateValue = Math.round(value);
    return db.query(sqlQueries.patchReviewVotesSQL,[id, voteUpdateValue]); //The sql itself deff works, checked it manually.
}

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewComments,
  fetchSingleReview,
  updateReviewVotes
};
